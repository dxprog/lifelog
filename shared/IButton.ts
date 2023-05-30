import { EventDataType } from './EventDataTypes';

export interface IButton {
  buttonId: number;
  deviceId: string;
  buttonIndex: number;
  eventDataType: EventDataType;
  buttonName: string;
}
