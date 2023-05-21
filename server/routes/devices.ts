import * as express from 'express';

import { Device } from '../models/Device';
import { withErrorHandler } from './helpers';

/**
 * Attempts to register a new device. This is called by the button device on bootup
 */
async function registerDevice(req: express.Request, res: express.Response) {
  if (!req.body?.deviceId) {
    res.status(400).send();
    return;
  }

  // check to see if this device has already been registered
  let [ deviceObj ] = await Device.selectAll({
    id: req.body.deviceId,
  });

  console.log(deviceObj);

  if (!deviceObj) {
    deviceObj = Device.createFromObject({
      id: req.body.deviceId,
      deviceName: 'new-device',
    }) as Device;
    await deviceObj.sync(true);
  }

  res.json(deviceObj);
}

export default function registerRoutes(app: express.Express) {
  app.post('/device', withErrorHandler(registerDevice));
}
