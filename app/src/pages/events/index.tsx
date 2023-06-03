import React, { useMemo } from 'react';
import { Box, Container, Divider, Flex, Heading, Highlight, Spacer, Text, VStack } from '@chakra-ui/react';

import EventIcon from '@app/components/EventIcon';
import { useEvents } from '@app/hooks/useEvents';
import { useButtons } from '@app/hooks/useButtons';

type IEventsPageProps = {
  deviceId: string;
};

const EventsPage = ({ deviceId }: IEventsPageProps): React.ReactElement => {
  const { events, isLoading: eventsLoading, hasError } = useEvents(deviceId);
  const { buttons, isLoading: buttonsLoading } = useButtons(deviceId);
  const isLoading = useMemo(
    () => eventsLoading || buttonsLoading,
    [ eventsLoading, buttonsLoading ]
  );

  const dateFormatter = Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  });
  const timeFormatter = Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });

  let lastDate: string = '';

  return (
    <Container>
      <Heading>
        Event Stream
      </Heading>
      {!isLoading && events && (
        <VStack divider={<Divider />}>
          {events.map(event => {
            const dateStamp = new Date(event.eventDate);
            const date = dateFormatter.format(dateStamp);
            const isNewDay = date !== lastDate;

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
                      {event.eventDataType}
                    </Text>
                    <Spacer />
                    <Text>
                      {timeFormatter.format(new Date(event.eventDate))}
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
