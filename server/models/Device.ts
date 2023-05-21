import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

export interface IDevice {
  deviceId: string;
  deviceName: string;
}

@Entity('devices')
export class Device extends BaseEntity implements IDevice {
  @PrimaryColumn({ type: 'varchar', length: 32, nullable: false, unique: true })
  public deviceId: string;

  @Column({ type: 'text' })
  public deviceName: string;
}
