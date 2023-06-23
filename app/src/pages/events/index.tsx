import React, { useMemo } from 'react';
import { Badge, Container, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material';

import { useAppHeader } from '@app/components/AppHeader';
import EventIcon, { IconSize } from '@app/components/EventIcon';
import { useEvents } from '@app/hooks/useEvents';
import { useButtons } from '@app/hooks/useButtons';
import { useDevice } from '@app/hooks/useDevice';
import { useDateFormatter } from '@app/hooks/useDateFormatter';
import { EventToggle, ToggleEventDataTypes } from '@shared/EventDataTypes';

const EventsPage = (): React.ReactElement => {
  const deviceId = useDevice();
  const { setPageTitle } = useAppHeader();
  const { events, isLoading: eventsLoading } = useEvents(deviceId);
  const { buttonLabels, isLoading: buttonsLoading } = useButtons(deviceId);
  const { formatMediumDate, formatShortTime } = useDateFormatter();
  const isLoading = useMemo(
    () => eventsLoading || buttonsLoading,
    [ eventsLoading, buttonsLoading ]
  );

  let lastDate: string = '';

  useMemo(() => {
    setPageTitle('Events');
  }, [ setPageTitle ]);

  return (
    <Container>
      <Typography variant="h6" component="h1">
        Event Stream
      </Typography>
      {!isLoading && events && (
        <List>
          {events.map((event, index) => {
            const date = formatMediumDate(event.eventDate);
            const isNewDay = date !== lastDate;
            const isToggleEvent = ToggleEventDataTypes.includes(event.eventDataType);
            const toggleStarted = isToggleEvent && event.eventValue !== EventToggle.Stop;
            const ToggleBadge = (
              <Badge
                badgeContent={toggleStarted ? 'Started' : 'Stopped'}
                color={toggleStarted ? 'success' : 'error'}
              />
            );

            lastDate = date;

            return (
              <>
                {isNewDay && (
                  <ListSubheader>
                    {date}
                  </ListSubheader>
                )}
                <ListItem
                  secondaryAction={isToggleEvent && ToggleBadge}
                  divider
                >
                  <ListItemIcon>
                    <EventIcon eventDataType={event.eventDataType} size={IconSize.Large} />
                  </ListItemIcon>
                  <ListItemText
                    primary={buttonLabels[event.eventDataType]}
                    secondary={formatShortTime(event.eventDate)}
                  />
                </ListItem>
              </>
            );
          })}
        </List>
      )}
    </Container>
  )
};

export default EventsPage;
