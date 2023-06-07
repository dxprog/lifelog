import React, { useMemo } from 'react';

import { useDevice } from '@app/hooks/useDevice';
import { useStats } from '@app/hooks/useStats';
import { Box, Card, CardBody, CardHeader, Container, Heading, Spinner, Stack, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import EventIcon from '@app/components/EventIcon';
import { IconSize } from '@app/components/EventIcon';
import { useButtons } from '@app/hooks/useButtons';
import { useDateFormatter } from '@app/hooks/useDateFormatter';

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
  const deviceId = useDevice();
  const {
    isLoading: isStatsLoading,
    hasError: hasStatsError,
    rollupStats,
    startDate,
  } = useStats(deviceId);
  const { formatMediumDate } = useDateFormatter();
  const { isLoading: isButtonsLoading, hasError: hasButtonsError, buttonLabels } = useButtons(deviceId);
  const isLoading = useMemo(() => isStatsLoading || isButtonsLoading, [ isStatsLoading, isButtonsLoading ]);
  const hasError = useMemo(() => hasStatsError || hasButtonsError, [ hasStatsError, hasButtonsError ]);

  return (
    <Container>
      <Heading>Stats</Heading>
      <Heading size="lg" as="h3">{formatMediumDate(startDate)}</Heading>
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
