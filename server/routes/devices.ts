import * as express from 'express';

import { Device } from '../models/Device';
import { withErrorHandler } from './helpers';

/**
 * Attempts to register a new device. This is called by the button device on bootup
 */
async function registerDevice(req: express.Request, res: express.Response) {
  if (!req.body?.deviceId) {
    res.status(400).send('"deviceId" is required');
    return;
  }

  // check to see if this device has already been registered
  let deviceObj = await Device.findOneBy({
    deviceId: req.body.deviceId,
  });

  if (!deviceObj) {
    deviceObj = new Device();
    deviceObj.deviceId = req.body.deviceId;
    deviceObj.deviceName = 'New LifeLog Device';
    await deviceObj.save();
  }

  res.json(deviceObj);
}

export default function registerRoutes(app: express.Express) {
  app.post('/device', withErrorHandler(registerDevice));
}
