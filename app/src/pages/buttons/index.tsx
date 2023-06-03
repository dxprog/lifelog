import React, { useCallback, useMemo, useState } from 'react';
import { Spinner, Heading, Container, VStack, StackDivider } from '@chakra-ui/react';

import { useButtons } from '@app/hooks/useButtons';
import { useDevice } from '@app/hooks/useDevice';

import { ButtonItem } from './components/Button';

const Buttons = () => {
  const deviceId = useDevice();
  const { buttons, isLoading, updateButton } = useButtons(deviceId);

  return (
    <Container>
      <Heading>Buttons</Heading>
      {isLoading && <Spinner color="purple.500" size="xl" />}
      {!isLoading && buttons && (
        <VStack divider={<StackDivider />}>
          {buttons.map(button => (
            <Container>
              <ButtonItem button={button} updateButton={updateButton} />
            </Container>
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default Buttons;
