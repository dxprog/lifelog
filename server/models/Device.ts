import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IDevice {
  deviceId: number;
  deviceMac: string;
  deviceName: string;
}

@Entity('devices')
export class Device extends BaseEntity implements IDevice {
  @PrimaryGeneratedColumn({ type: 'int' })
  public deviceId: number;

  @Column({ type: 'varchar', length: 32, nullable: false, unique: true })
  public deviceMac: string;

  @Column({ type: 'text' })
  public deviceName: string;
}
