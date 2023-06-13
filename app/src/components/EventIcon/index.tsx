import React from 'react';
import { ReactSVG } from 'react-svg';

import { EventDataType } from '@shared/EventDataTypes';

import './styles.scss';

export enum IconSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  XLarge = 'xl',
  XXLarge = 'xxl',
};

type EventIconProps = {
  eventDataType: EventDataType,
  size?: IconSize,
}

const EventIcon = ({ eventDataType, size = IconSize.Medium }: EventIconProps): React.ReactElement => (
  <ReactSVG src={`/assets/${eventDataType}.svg`} className={`event-icon event-icon--${size}`} />
);

export default EventIcon;
