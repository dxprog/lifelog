import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useAppHeader } from '@app/components/AppHeader';
import DateHeader from '@app/components/DateHeader';
import RollupCard from '@app/components/RollupCard';
import { useDevice } from '@app/hooks/useDevice';
import { useStats } from '@app/hooks/useStats';
import { useButtons } from '@app/hooks/useButtons';
import { TimeInMs } from '@shared/DateHelpers';
import { CircularProgress, Container, Stack, Typography } from '@mui/material';

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
  const { setPageTitle } = useAppHeader();

  const handleDateChange = useCallback((newDate: Date) => {
    setStartDate(newDate);
  }, []);

  useMemo(() => {
    setPageTitle('Statistics');
  }, [ setPageTitle ]);

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h6" component="h2">Stats</Typography>
        {/* <Heading size="lg" as="h3">{formatMediumDate(startDate)}</Heading> */}
        <DateHeader selectedDate={startDate} onDateChange={handleDateChange} />
        {isLoading && <CircularProgress />}
        {!isLoading && !hasError && (
          <Stack spacing={2}>
            {rollupStats.map(stat => <RollupCard stat={stat} buttonLabels={buttonLabels} />)}
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default StatsPage;
