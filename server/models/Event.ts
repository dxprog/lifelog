import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EventDataType } from './types';

export interface IEvent {
  eventId: number;
  deviceMac: string;
  buttonIndex: number;
  eventDate: number;
  eventDataType: EventDataType;
  eventValue?: string;
}

@Entity('events')
export class Event extends BaseEntity implements IEvent {
  @PrimaryGeneratedColumn({ type: 'int' })
  public eventId: number;

  @Column({ type: 'varchar', length: 32, nullable: false })
  public deviceMac: string;

  @Column({ type: 'int8', nullable: false })
  public buttonIndex: number;

  @Column({ type: 'bigint', nullable: false })
  public eventDate: number;

  @Column({ type: 'varchar', length: 32, nullable: false })
  public eventDataType: EventDataType;

  @Column({ type: 'varchar', length: 32, nullable: true })
  public eventValue: string;
}
