import React from 'react';
import { Container, Heading } from '@chakra-ui/react';

import EventIcon from '@app/components/EventIcon';
import { useEvents } from '@app/hooks/useEvents';

type IEventsPageProps = {
  deviceId: string;
};

const EventsPage = ({ deviceId }: IEventsPageProps): React.ReactElement => {
  const { events, isLoading, hasError } = useEvents(deviceId);
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
        <ul>
          {events.map(event => {
            const dateStamp = new Date(event.eventDate);
            const date = dateFormatter.format(dateStamp);
            const isNewDay = date !== lastDate;

            lastDate = date;

            return (
              <>
                {isNewDay && <li><strong>{date}</strong></li>}
                <li>
                  <EventIcon eventDataType={event.eventDataType} />
                  {event.eventDataType} - {timeFormatter.format(new Date(event.eventDate))}
                </li>
              </>
            );
          })}
        </ul>
      )}
    </Container>
  )
};

export default EventsPage;
