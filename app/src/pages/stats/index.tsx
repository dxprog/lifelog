import React from 'react';

import { useDevice } from '@app/hooks/useDevice';
import { useStats } from '@app/hooks/useStats';
import { Box, Container, Heading, Spinner, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';

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
  const { isLoading, hasError, rollupStats } = useStats(deviceId);

  return (
    <Container>
      <Heading>Stats</Heading>
      {isLoading && <Spinner color="purple.500" size="xl" />}
      {!isLoading && !hasError && rollupStats.map(stat => (
        <Stat>
          <StatLabel>{stat.eventDataType}</StatLabel>
          <StatNumber>{stat.count}</StatNumber>
          {stat.duration && <StatHelpText>{formatDuration(stat.duration)}</StatHelpText>}
        </Stat>
      ))}
    </Container>
  );
};

export default StatsPage;
