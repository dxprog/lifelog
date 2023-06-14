import { useMemo, useState } from 'react';
import { useEvents } from './useEvents';
import { EventDataType, EventToggle, ToggleEventDataTypes } from '@shared/EventDataTypes';
import { IEvent } from '@server/models/Event';

import { EventStat, EventStats } from './types';

type EventRollup = Partial<Record<EventDataType, IEvent[]>>;

export function useStats(deviceId: string, startDate: Date, endDate: Date) {
  const now = new Date();
  const { isLoading, events, hasError } = useEvents(deviceId, startDate, endDate);

  const rollupStats = useMemo<EventStats>(() => {
    if (isLoading || hasError || !events?.length) {
      return [];
    }

    // sort everything by date
    const sortedEvents = [ ...events ];
    sortedEvents.sort((a, b) => a.eventDate < b.eventDate ? -1 : 1);

    const eventsByType: EventRollup = sortedEvents.reduce((acc, event) => {
      const { eventDataType } = event;

      if (!acc[eventDataType]) {
        acc[eventDataType] = [];
      }
      acc[eventDataType].push(event);

      return acc;
    }, {} as EventRollup);

    return Object.keys(eventsByType).map((eventDataType: EventDataType) => {
      const typeEvents = eventsByType[eventDataType];
      const retVal: EventStat = {
        eventDataType,
        count: typeEvents.length,
      };

      if (ToggleEventDataTypes.includes(eventDataType)) {
        let startTime = 0;
        let duration = 0;
        let count = 0;
        for (const event of typeEvents) {
          if (event.eventValue === EventToggle.Start) {
            startTime = event.eventDate;
          } else if (event.eventValue === EventToggle.Stop && startTime) {
            duration += event.eventDate - startTime;
            startTime = 0;
            count++;
          }
        }

        retVal.count = count;
        retVal.duration = duration;
      }

      return retVal;
    });
  }, [ isLoading, hasError, events ]);

  return {
    startDate,
    endDate,
    isLoading,
    hasError,
    rollupStats,
  };
}
