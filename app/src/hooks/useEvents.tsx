import { useMemo, useState } from 'react';

import { IEvent } from '@server/models/Event';

export function useEvents(deviceId: string, startDate?: Date | undefined, endDate?: Date | undefined) {
  const [ events, setEvents ] = useState<IEvent[] | null>(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ hasError, setHasError ] = useState(false);

  useMemo(async () => {
    if (isLoading || hasError || events) {
      return;
    }

    setIsLoading(true);

    try {
      const startTime = startDate?.getTime();
      const endTime = endDate?.getTime();
      const params = new URLSearchParams({
        startTime: `${startTime}`,
        endTime: `${endTime}`
      });
      const queryStr = params.toString();
      const response = await fetch(
        `//api.babylog.net/events/${deviceId}${queryStr ? '?' + queryStr : ''}`
      );
      const data = await response.json() as IEvent[];
      setEvents(data);
      setHasError(false);
    } catch (err) {
      console.error(err);
      setHasError(true);
    }

    setIsLoading(false);
  }, [ events, isLoading, hasError, startDate, endDate ]);

  return {
    events,
    isLoading,
    hasError,
  };
}
