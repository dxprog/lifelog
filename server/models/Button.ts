import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

import { EventDataType } from './types';

export interface IButton {
  deviceMac: string;
  buttonIndex: number;
  eventDataType: EventDataType;
}

@Entity('buttons')
export class Button extends BaseEntity implements IButton {
  // the primary ID will be `${deviceId}_${buttonIndex}`
  @PrimaryColumn({ type: 'int' })
  public buttonId: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  public deviceMac: string;

  @Column({ type: 'int8', nullable: false })
  public buttonIndex: number;

  @Column({ type: 'varchar', length: 32, nullable: false })
  public eventDataType: EventDataType;
}
