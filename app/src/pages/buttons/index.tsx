import React, { useCallback, useMemo, useState } from 'react';
import { Spinner, Heading, Container, VStack, StackDivider } from '@chakra-ui/react';

import { IButton } from '@shared/IButton';

import { ButtonItem } from './components/Button';

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
    <Container>
      <Heading>Buttons</Heading>
      {loading && <Spinner color="purple.500" size="xl" />}
      {!loading && (
        <VStack divider={<StackDivider />}>
          {buttons.map(button => (
            <Container>
              <ButtonItem button={button} updateButton={handleUpdateButton} />
            </Container>
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default Buttons;
