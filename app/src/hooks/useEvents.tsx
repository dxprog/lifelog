import { useMemo, useState } from 'react';

import { IEvent } from '@server/models/Event';

export function useEvents(deviceId: string) {
  const [ events, setEvents ] = useState<IEvent[] | null>(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ hasError, setHasError ] = useState(false);

  useMemo(async () => {
    if (isLoading || hasError || events) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`//api.babylog.net/events/${deviceId}`);
      const data = await response.json() as IEvent[];
      setEvents(data);
      setHasError(false);
    } catch (err) {
      console.error(err);
      setHasError(true);
    }

    setIsLoading(false);
  }, [ events, isLoading, hasError ]);

  return {
    events,
    isLoading,
    hasError,
  };
}
