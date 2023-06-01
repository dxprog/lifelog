import { useCallback, useMemo, useState } from "react";

import { IButton } from '@shared/IButton';

export function useButtons(deviceId: string) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ hasError, setHasError ] = useState(false);
  const [ buttons, setButtons ] = useState<IButton[] | null>(null);

  useMemo(async () => {
    if (isLoading || hasError || buttons) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`//api.babylog.net/buttons/${deviceId}`);
      const data = await response.json() as IButton[];
      setButtons(data);
      setHasError(false);
    } catch (err) {
      setHasError(true);
      console.error(err);
    }

    setIsLoading(false);
  }, [ buttons, isLoading, hasError ]);

  const updateButton = useCallback(async (button: Partial<IButton>) => {
    setIsLoading(true);
    try {
      const response = await fetch('//api.babylog.net/button', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(button),
      });
      setIsLoading(false);
      setButtons(null);
    } catch (err) {
      setHasError(true);
    }
  }, [ setHasError, setIsLoading, setButtons ]);

  return {
    buttons: buttons ?? [],
    isLoading,
    hasError,
    updateButton,
  }
}
