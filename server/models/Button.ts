import {
  DbModel,
  tableName,
  tableSchema,
  ColumnTypes
} from '../lib/DbModel';
import { EventDataType } from './types';

export interface IButton {
  deviceId: string;
  buttonIndex: number;
  buttonDataType: EventDataType;
}

@tableName('buttons')
@tableSchema({
  id: { name: 'buttonId', type: ColumnTypes.Number, primaryKey: true },
  deviceId: { name: 'deviceId', type: ColumnTypes.String },
  buttonIndex: { name: 'buttonIndex', type: ColumnTypes.Number },
  buttonDataType: { name: 'buttonDataType', type: ColumnTypes.String },
})
export class Button extends DbModel implements IButton {
  public deviceId: string;
  public buttonIndex: number;
  public buttonDataType: EventDataType;

  constructor() {
    super();
  }

  public static create() {
    return new Button();
  }
}
