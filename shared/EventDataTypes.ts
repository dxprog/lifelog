export enum EventDataType {
  WetDiaper = 'wet_diaper',
  DirtyDiaper = 'dirty_diaper',
  SleepToggle = 'sleep_toggle',
  Weight = 'weight',
  Pumping = 'pumping',
  BottleFeed = 'bottle_feed',
  BreastFeed = 'breast_feed',
  SolidFood = 'solid_food',
  RegisterButton = 'register_button',
}

export const ToggleEventDataTypes: EventDataType[] = [
  EventDataType.SleepToggle,
  EventDataType.BottleFeed,
  EventDataType.BreastFeed,
  EventDataType.Pumping,
];

export enum EventToggle {
  Start = 'start',
  Stop = 'stop'
};
