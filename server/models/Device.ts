import {
  DbModel,
  tableName,
  tableSchema,
  ColumnTypes
} from '../lib/DbModel';
import { EventDataType } from './types';

export interface IDevice {
  deviceName: string;
}

@tableName('devices')
@tableSchema({
  id: { name: 'deviceId', type: ColumnTypes.String, primaryKey: true },
  deviceName: { name: 'deviceName', type: ColumnTypes.String },
})
export class Device extends DbModel implements IDevice {
  public deviceName: string;

  constructor() {
    super();
  }

  public static create() {
    return new Device();
  }
}
