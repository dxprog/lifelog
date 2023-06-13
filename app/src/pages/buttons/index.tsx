import React from 'react';
import { CircularProgress, Container, Divider, Stack, Typography } from '@mui/material';

import { useButtons } from '@app/hooks/useButtons';
import { useDevice } from '@app/hooks/useDevice';

import { ButtonItem } from './components/Button';

const Buttons = () => {
  const deviceId = useDevice();
  const { buttons, isLoading, updateButton } = useButtons(deviceId);

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
