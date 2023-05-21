import * as express from 'express';
import { DataSource } from 'typeorm';

import config from '../config';
import Db from './lib/Db';
import initDeviceRoutes from './routes/devices';
import initEventRoutes from './routes/events';

import { Button, Device, Event } from './models';

const app = express();
app.use(express.json());

const dataSource = new DataSource({
  type: 'sqlite',
  database: config.dbFile,
  entities: [
    Button,
    Device,
    Event,
  ],
  synchronize: true,
});

app.listen(config.port, async () => {
  await dataSource.initialize();
  initDeviceRoutes(app);
  initEventRoutes(app);
  console.log(`Server started on port ${config.port}`);
});
