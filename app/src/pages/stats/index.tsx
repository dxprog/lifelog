import React, { useCallback, useMemo, useState } from 'react';

import { useDevice } from '@app/hooks/useDevice';
import { useStats } from '@app/hooks/useStats';
import EventIcon, { IconSize } from '@app/components/EventIcon';
import DateHeader from '@app/components/DateHeader';
import { useButtons } from '@app/hooks/useButtons';
import { TimeInMs } from '@shared/DateHelpers';
import { Card, CardContent, CardHeader, CardMedia, CircularProgress, Container, Divider, Stack, Typography } from '@mui/material';

function formatDuration(duration: number) {
  let durationInSeconds = duration / 1000;
  let hours = Math.floor(durationInSeconds / 3600);
  let minutes = Math.floor((durationInSeconds - hours * 3600) / 60);

  let retVal: string[] = [];
  if (hours) {
    retVal.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  }

  if (minutes) {
    retVal.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  }

  return retVal.join(' ');
}

const StatsPage = (): React.ReactElement => {
  const now = new Date();
  const deviceId = useDevice();
  const [ startDate, setStartDate ] = useState<Date>(
    new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`)
  );
  const [ endDate, setEndDate ] = useState<Date>(new Date(startDate.getTime() + TimeInMs.OneDay));
  const {
    isLoading: isStatsLoading,
    hasError: hasStatsError,
    rollupStats,
  } = useStats(deviceId, startDate, endDate);
  const { isLoading: isButtonsLoading, hasError: hasButtonsError, buttonLabels } = useButtons(deviceId);
  const isLoading = useMemo(() => isStatsLoading || isButtonsLoading, [ isStatsLoading, isButtonsLoading ]);
  const hasError = useMemo(() => hasStatsError || hasButtonsError, [ hasStatsError, hasButtonsError ]);

  const handleDateChange = useCallback((newDate: Date) => {
    console.log(startDate, newDate);
    setStartDate(newDate);
  }, []);

  return (
    <Container>
      <Typography variant="h6" component="h2">Stats</Typography>
      {/* <Heading size="lg" as="h3">{formatMediumDate(startDate)}</Heading> */}
      <DateHeader selectedDate={startDate} onDateChange={handleDateChange} />
      {isLoading && <CircularProgress />}
      {!isLoading && !hasError && (
        <Stack spacing={2}>
          {rollupStats.map(stat => {
            const countLabel = `${stat.count} time${stat.count !== 1 ? 's' : ''}`;
            return (
              <Card>
                <CardHeader>
                  <EventIcon eventDataType={stat.eventDataType} size={IconSize.Large} />
                </CardHeader>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {buttonLabels[stat.eventDataType]}
                  </Typography>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    <Typography variant="body2">
                      {stat.duration && (formatDuration(stat.duration))}
                      {!stat.duration && countLabel}
                    </Typography>
                    {stat.duration && <Typography variant="body2">{countLabel}</Typography>}
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}
    </Container>
  );
};

export default StatsPage;
