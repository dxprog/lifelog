import React, { useCallback, useMemo, useState } from 'react';

import { useDevice } from '@app/hooks/useDevice';
import { useStats } from '@app/hooks/useStats';
import { Card, CardBody, CardHeader, Container, Heading, Spinner, Stack, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import EventIcon, { IconSize } from '@app/components/EventIcon';
import DateHeader from '@app/components/DateHeader';
import { useButtons } from '@app/hooks/useButtons';
import { useDateFormatter } from '@app/hooks/useDateFormatter';
import { TimeInMs } from '@shared/DateHelpers';

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
      <Heading>Stats</Heading>
      {/* <Heading size="lg" as="h3">{formatMediumDate(startDate)}</Heading> */}
      <DateHeader selectedDate={startDate} onDateChange={handleDateChange} />
      {isLoading && <Spinner color="purple.500" size="xl" />}
      {!isLoading && !hasError && rollupStats.map(stat => (
        <Card direction="row" mb={3} alignItems="center">
          <CardHeader>
            <EventIcon eventDataType={stat.eventDataType} size={IconSize.Large} />
          </CardHeader>
          <Stack>
            <CardBody>
              <Stat>
                <StatLabel>{buttonLabels[stat.eventDataType]}</StatLabel>
                <StatNumber>
                  {stat.duration && (formatDuration(stat.duration))}
                  {!stat.duration && stat.count}
                </StatNumber>
                {stat.duration && <StatHelpText>{`${stat.count} time${stat.count !== 1 ? 's' : ''}`}</StatHelpText>}
              </Stat>
            </CardBody>
          </Stack>
        </Card>
      ))}
    </Container>
  );
};

export default StatsPage;
