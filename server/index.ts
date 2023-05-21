import * as express from 'express';

import config from '../config';
import Db from './lib/Db';
import initDeviceRoutes from './routes/devices';
import initEventRoutes from './routes/events';

const app = express();
app.use(express.json());

app.listen(config.port, async () => {
  await Db.connect(config.dbFile);
  initDeviceRoutes(app);
  initEventRoutes(app);
  console.log(`Server started on port ${config.port}`);
});
