import { EventDataType } from "@shared/EventDataTypes";

export type ButtonLabelMap = Partial<Record<EventDataType, string>>;

export type EventStat = {
  eventDataType: EventDataType;
  count: number;
  duration?: number;
};
export type EventStats = EventStat[];
