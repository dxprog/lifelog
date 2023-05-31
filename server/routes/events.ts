import * as express from 'express';

import { Event, IEvent } from '../models/Event';
import { withErrorHandler } from './helpers';
import { Button } from '../models/Button';
import { EventDataType } from '@shared/EventDataTypes';
import { Between, FindOptionsWhere } from 'typeorm';

// Default to one day's worth of observations (24 * 60 * 60 * 1000)
const DEFAULT_OBSERVATION_SPAN = 86400000;

async function getEvents(req: express.Request, res: express.Response) {
  const filters: FindOptionsWhere<Event> = {};

  const startTime = parseInt(req.query.startTime as string, 10) || Date.now() - DEFAULT_OBSERVATION_SPAN;
  const endTime = parseInt(req.query.endTime as string, 10) || Date.now();
  filters.eventDate = Between(startTime, endTime);
  filters.deviceId = req.params.deviceId;

  if (req.query.eventDataType) {
    filters.eventDataType = req.query.eventDataType as EventDataType;
  }

  const retVal = await Event.findBy(filters);
  res.json(retVal);
}

/**
 * Records a single observation and returns the database record
 */
async function addEvent(req: express.Request, res: express.Response) {
  const data = req.body as IEvent;
  const event = new Event();

  let button = await Button.findOneBy({
    deviceId: data?.deviceId,
    buttonIndex: data?.buttonIndex,
  });

  // if a button wasn't found, it's new and needs to be registered
  if (!button) {
    button = new Button();
    button.deviceId = data?.deviceId;
    button.buttonIndex = data?.buttonIndex;
    button.eventDataType = EventDataType.RegisterButton;
    button.buttonName = `Button ${button.buttonIndex + 1}`;
    try {
      await button.save();
      res.status(201).send();
    } catch (err: unknown) {
      res.status(500).send();
    }
    return;
  }

  // don't record an event for a button that doesn't have a type assigned
  if (button.eventDataType === EventDataType.RegisterButton) {
    res.send();
    return;
  }

  event.buttonIndex = data?.buttonIndex;
  event.deviceId = data?.deviceId;
  event.eventDate = Date.now();
  event.eventDataType = button.eventDataType;

  try {
    await event.save();
    res.json(event);
  } catch (err: unknown) {
    console.error('Error adding observation: ', err);
    res.status(500).send();
  }
}

export default function registerRoutes(app: express.Express) {
  app.get('/events/:deviceId', withErrorHandler(getEvents));
  app.post('/event', withErrorHandler(addEvent));
}
