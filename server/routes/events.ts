import * as express from 'express';

import { Event, IEvent } from '../models/Event';
import { withErrorHandler } from './helpers';
import { Button } from '../models/Button';

// Default to one day's worth of observations (24 * 60 * 60 * 1000)
const DEFAULT_OBSERVATION_SPAN = 86400000;

async function getEvents(req: express.Request, res: express.Response) {
  const filters: Record<string, unknown> = {};

  if (req.query.eventDataType) {
    filters.eventDataType = req.query.eventDataType;
  }

  const startTime = req.query.startTime || Date.now() - DEFAULT_OBSERVATION_SPAN;
  const endTime = req.query.endTime || Date.now();

  filters.eventDate = {
    between: [ startTime, endTime ],
  };

  const retVal = await Event.findBy(filters);
  res.json(retVal);
}

/**
 * Records a single observation and returns the database record
 */
async function addEvent(req: express.Request, res: express.Response) {
  const data = req.body as IEvent;
  const event = new Event();

  let button: Button;
  try {
    button = await Button.findOneByOrFail({
      buttonId: `${data?.deviceMac}_${data?.buttonIndex}`,
    });
  } catch (err: unknown) {
    res.status(404).send();
    return;
  }

  event.buttonIndex = data?.buttonIndex;
  event.deviceMac = data?.deviceMac;
  event.eventDate = Date.now();
  event.eventDataType = button.eventDataType;

  if (event) {
    try {
      await event.save();
      res.json(event);
    } catch (err) {
      console.log('Error adding observation: ', err);
      res.status(500).send();
    }
  } else {
    res.status(400).send();
  }
}

// /**
//  * Records multiple observations and returns the database records
//  */
// async function addEvents(req: express.Request, res: express.Response) {
//   try {
//     if (!Array.isArray(req.body)) {
//       res.status(400).send();
//       return;
//     }

//     const events = req.body.map(item => {
//       return Event.createFromObject({
//         ...item,
//         observationTime: Date.now(),
//       });
//     });

//     try {
//       const records = await Promise.all(events.map(async (event) => {
//         if (event) {
//           await event.sync();
//         }
//         return event;
//       }));
//       res.json(records);
//     } catch (err) {
//       console.error('There was an error syncing observations: ', err);
//       res.status(500).send();
//     }

//   } catch (err) {
//     console.error('Error parsing observation records: ', err);
//     res.status(400).send();
//   }
// }

export default function registerRoutes(app: express.Express) {
  app.get('/events', withErrorHandler(getEvents));
  app.post('/event', withErrorHandler(addEvent));
  // app.post('/events', withErrorHandler(addEvents))
}
