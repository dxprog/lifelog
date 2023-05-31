import React, { useCallback, useMemo, useState } from 'react';

import { IButton } from '@shared/IButton';

import { Button } from './components/Button';

type ButtonsProps = {
  deviceId: string;
};

const Buttons = ({ deviceId }: ButtonsProps) => {
  const [ loading, setLoading ] = useState(false);
  const [ reload, setReload ] = useState(false);
  const [ buttons, setButtons ] = useState<IButton[]>([]);
  const [ error, setError ] = useState(false);
  const [ loadedDeviceId, setLoadedDeviceId ] = useState('');

  useMemo(async () => {
    if ((loading || deviceId === loadedDeviceId) && !error && !reload) {
      return;
    }

    setReload(false);
    setLoading(true);
    try {
      const response = await fetch(`//api.babylog.net/buttons/${deviceId}`);
      const data = await response.json() as IButton[];
      setLoadedDeviceId(deviceId);
      setButtons(data);
    } catch (err) {
      setError(true);
    }

    setLoading(false);
  }, [ deviceId, loadedDeviceId, loading, reload, setButtons ]);

  const handleUpdateButton = useCallback(async (updatedButton: Partial<IButton>) => {
    setLoading(true);
    try {
      const response = await fetch('//api.babylog.net/button', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedButton),
      });
      setReload(true);
    } catch (err) {
      setError(true);
    }
  }, [ buttons, setLoading, setReload ]);

  return (
    <div>
      <h1>Buttons</h1>
      {loading && <h2>Loading...</h2>}
      {!loading && (
        <ul>
          {buttons.map(button => (
            <li>
              <Button button={button} updateButton={handleUpdateButton} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Buttons;
