import { useDateFormatter } from '@app/hooks/useDateFormatter';
import { Button, Dialog, Stack } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import React, { useCallback, useState } from 'react';
import { TimeInMs } from '@shared/DateHelpers';

type DateHeaderProps = {
  selectedDate: Date;
  onDateChange: (newDate: Date) => void;
}

const DateHeader = ({ selectedDate, onDateChange }: DateHeaderProps) => {
  const [ showDatePicker, setShowDatePicker ] = useState(false);
  const { formatMediumDate } = useDateFormatter();

  const handleDateChange = useCallback((newDate: any) => {
    setShowDatePicker(false);
    if (newDate && newDate.$d) {
      onDateChange(newDate.$d);
    }
  }, [ onDateChange, setShowDatePicker ]);

  const handleOneDayChange = useCallback((direction: number) => {
    onDateChange(new Date(selectedDate.getTime() + TimeInMs.OneDay * direction));
  }, [ selectedDate, onDateChange ]);

  return (
    <Stack direction="row">
      <Button startIcon={<ChevronLeft />} onClick={() => handleOneDayChange(-1)} />
      <Button
        onClick={() => setShowDatePicker(!showDatePicker)}
        variant="outlined"
        fullWidth
      >
        {formatMediumDate(selectedDate)}
      </Button>
      <Button startIcon={<ChevronRight />} onClick={() => handleOneDayChange(1)} />
      <Dialog open={showDatePicker} onClose={() => setShowDatePicker(false)}>
        <DateCalendar
          onChange={handleDateChange}
        />
      </Dialog>
    </Stack>
  );
}

export default DateHeader;
