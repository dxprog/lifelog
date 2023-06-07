import React, { useMemo } from 'react';
import { Badge, Container, Divider, Flex, Heading, Spacer, Text, VStack } from '@chakra-ui/react';

import EventIcon from '@app/components/EventIcon';
import { useEvents } from '@app/hooks/useEvents';
import { useButtons } from '@app/hooks/useButtons';
import { useDevice } from '@app/hooks/useDevice';
import { useDateFormatter } from '@app/hooks/useDateFormatter';
import { EventToggle, ToggleEventDataTypes } from '@shared/EventDataTypes';

const EventsPage = (): React.ReactElement => {
  const deviceId = useDevice();
  const { events, isLoading: eventsLoading, hasError } = useEvents(deviceId);
  const { buttonLabels, isLoading: buttonsLoading } = useButtons(deviceId);
  const { formatMediumDate, formatShortTime } = useDateFormatter();
  const isLoading = useMemo(
    () => eventsLoading || buttonsLoading,
    [ eventsLoading, buttonsLoading ]
  );

  let lastDate: string = '';

  return (
    <Container>
      <Heading>
        Event Stream
      </Heading>
      {!isLoading && events && (
        <VStack divider={<Divider />}>
          {events.map(event => {
            const date = formatMediumDate(event.eventDate);
            const isNewDay = date !== lastDate;
            const isToggleEvent = ToggleEventDataTypes.includes(event.eventDataType);
            const toggleStarted = isToggleEvent && event.eventValue !== EventToggle.Stop;

            lastDate = date;

            return (
              <>
                {isNewDay && (
                  <Container>
                    <Heading size="lg">{date}</Heading>
                  </Container>
                )}
                <Container>
                  <Flex align="center">
                    <EventIcon eventDataType={event.eventDataType} />
                    <Text fontSize="xl" pl={2}>
                      {buttonLabels[event.eventDataType]}
                    </Text>
                    <Spacer />
                    {isToggleEvent && (
                      <Badge colorScheme={toggleStarted ? 'green' : 'red'}>
                        {toggleStarted ? 'Started' : 'Stopped'}
                      </Badge>
                    )}
                    <Text pl={2}>
                      {formatShortTime(event.eventDate)}
                    </Text>
                  </Flex>
                </Container>
              </>
            );
          })}
        </VStack>
      )}
    </Container>
  )
};

export default EventsPage;
