import * as express from 'express';
import * as cors from 'cors';
import { DataSource } from 'typeorm';

import config from '../config';
import initDeviceRoutes from './routes/devices';
import initEventRoutes from './routes/events';
import initButtonRoutes from './routes/buttons';

import { Button, Device, Event } from './models';

const app = express();
app.use(express.json());
app.use(cors());

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
  initButtonRoutes(app);
  console.log(`Server started on port ${config.port}`);
});
