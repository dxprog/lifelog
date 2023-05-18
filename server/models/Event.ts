import {
  DbModel,
  tableName,
  tableSchema,
  ColumnTypes
} from '../lib/DbModel';
import { EventDataType } from './types';

export interface IEvent {
  deviceId?: string;
  buttonId?: number;
  eventDate: number;
  eventDataType: EventDataType;
  eventValue: string;
}

@tableName('events')
@tableSchema({
  id: { name: 'eventId', type: ColumnTypes.Number, primaryKey: true },
  deviceId: { name: 'deviceId', type: ColumnTypes.String },
  eventDate: { name: 'eventDate', type: ColumnTypes.Number },
  eventDataType: { name: 'eventDataType', type: ColumnTypes.String },
  eventValue: { name: 'eventValue', type: ColumnTypes.String },
})
export class Event extends DbModel implements IEvent {
  public deviceId: string;
  public buttonId: number;
  public eventDate: number;
  public eventDataType: EventDataType;
  public eventValue: string;

  constructor() {
    super();
  }

  public static create() {
    return new Event();
  }
}
