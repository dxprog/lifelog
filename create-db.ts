import Db from './server/lib/Db';
import config from './config';

const main = async () => {
  try {
    console.log('Connecting to database');
    await Db.connect(config.dbFile);
    console.log('Creating [devices] table');
    await Db.conn.exec(`
      CREATE TABLE IF NOT EXISTS devices (
        deviceId TEXT PRIMARY KEY,
        deviceName TEXT
      )
    `);
    console.log('Creating [buttons] table');
    await Db.conn.exec(`
      CREATE TABLE IF NOT EXISTS buttons (
        buttonId INTEGER PRIMARY KEY AUTOINCREMENT,
        deviceId TEXT NOT NULL,
        buttonIndex INTEGER NOT NULL,
        buttonDataType TEXT NOT NULL
      )
    `);
    console.log('Creating [events] table');
    await Db.conn.exec(`
      CREATE TABLE IF NOT EXISTS buttons (
        eventId INTEGER PRIMARY KEY AUTOINCREMENT,
        deviceId TEXT,
        buttonId INTEGER,
        eventDate INTEGER NOT NULL,
        eventDataType TEXT NOT NULL,
        eventValue TEXT
      )
    `);
  } catch (exc) {
    console.error('There was an error creating the database');
    console.error(exc);
  }
};

main();
