import { useCallback, useMemo } from 'react';

export function useDateFormatter() {
  // formatter objects...
  const mediumDateFormatter = useMemo(() => Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }), []);
  const shortTimeFormatter = useMemo(() => Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }), []);

  // ...and the callbacks to invoke them
  const formatMediumDate = useCallback(
    (date: number | Date) => mediumDateFormatter.format(date), [ mediumDateFormatter ]
  );
  const formatShortTime = useCallback(
    (date: number | Date) => shortTimeFormatter.format(date), [ shortTimeFormatter ]
  );

  return {
    formatMediumDate,
    formatShortTime,
  };
};
