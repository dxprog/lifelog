import * as express from 'express';

import { withErrorHandler } from './helpers';
import { Button, IButton } from '../models/Button';

async function updateButton(req: express.Request, res: express.Response) {
  const data = req.body as IButton;
  const button = await Button.findOneBy({
    deviceId: data?.deviceId,
    buttonIndex: data?.buttonIndex,
  });

  if (!button) {
    res.status(404).send();
    return;
  }

  button.buttonName = data?.buttonName ?? button.buttonName;
  button.eventDataType = data?.eventDataType ?? button.eventDataType;
  await button.save();
}

async function getButtonsForDevice(req: express.Request, res: express.Response) {
  const deviceId = req.params['deviceId'] as string;
  const buttons = await Button.findBy({ deviceId });
  res.json(buttons);
}

export default function registerRoutes(app: express.Express) {
  app.get('/buttons/:deviceId', withErrorHandler(getButtonsForDevice));
  app.put('/button', withErrorHandler(updateButton));
}
