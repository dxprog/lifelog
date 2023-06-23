import React, { useMemo } from 'react';
import { CircularProgress, Container, Divider, Stack, Typography } from '@mui/material';

import { useAppHeader } from '@app/components/AppHeader';
import { useButtons } from '@app/hooks/useButtons';
import { useDevice } from '@app/hooks/useDevice';

import { ButtonItem } from './components/Button';

const Buttons = () => {
  const deviceId = useDevice();
  const { buttons, isLoading, updateButton } = useButtons(deviceId);
  const { setPageTitle } = useAppHeader();

  useMemo(() => {
    setPageTitle('Device Buttons');
  }, [ setPageTitle ]);

  return (
    <Container>
      <Typography variant="h6" component="h2">Buttons</Typography>
      {isLoading && <CircularProgress />}
      {!isLoading && buttons && (
        <Stack divider={<Divider />}>
          {buttons.map(button => (
            <Container>
              <ButtonItem button={button} updateButton={updateButton} />
            </Container>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Buttons;
