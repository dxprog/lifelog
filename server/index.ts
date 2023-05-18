import * as express from 'express';

import config from '../config';
import Db from './lib/Db';
import initEventRoutes from './routes/events';

const app = express();
app.use(express.json());

app.listen(config.port, async () => {
  await Db.connect(config.dbFile);
  initEventRoutes(app);
  console.log(`Server started on port ${config.port}`);
});
