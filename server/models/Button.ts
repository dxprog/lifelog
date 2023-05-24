import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EventDataType } from '@shared/EventDataTypes';

export interface IButton {
  buttonId: number;
  deviceId: string;
  buttonIndex: number;
  eventDataType: EventDataType;
  buttonName: string;
}

@Entity('buttons')
export class Button extends BaseEntity implements IButton {
  // the primary ID will be `${deviceId}_${buttonIndex}`
  @PrimaryGeneratedColumn({ type: 'int' })
  public buttonId: number;

  @Column({ type: 'varchar', length: 32, nullable: false })
  public deviceId: string;

  @Column({ type: 'int8', nullable: false })
  public buttonIndex: number;

  @Column({ type: 'varchar', length: 32, nullable: false })
  public eventDataType: EventDataType;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public buttonName: string;
}
