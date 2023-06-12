import { useMemo, useState } from 'react';

import { IEvent } from '@server/models/Event';

export function useEvents(deviceId: string, startDate?: Date | undefined, endDate?: Date | undefined) {
  const [ events, setEvents ] = useState<IEvent[] | null>(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ hasError, setHasError ] = useState(false);
  const [ dateCacheStamp, setDateCacheStamp ] = useState('');

  useMemo(async () => {
    const startTime = startDate?.getTime();
    const endTime = endDate?.getTime();
    const cacheStamp = `${startTime}-${endTime}`;

    if (isLoading || hasError || (events && cacheStamp === dateCacheStamp)) {
      return;
    }

    setIsLoading(true);

    try {
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
    setDateCacheStamp(cacheStamp);
  }, [ events, isLoading, hasError, startDate, endDate, dateCacheStamp ]);

  return {
    events,
    isLoading,
    hasError,
  };
}
