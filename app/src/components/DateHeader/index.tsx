import { useDateFormatter } from '@app/hooks/useDateFormatter';
import { Button, Dialog } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import React, { useCallback, useState } from 'react';

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

  return (
    <>
      <Button
        onClick={() => setShowDatePicker(!showDatePicker)}
        variant="outlined"
        fullWidth
      >
        {formatMediumDate(selectedDate)}
      </Button>
      <Dialog open={showDatePicker} onClose={() => setShowDatePicker(false)}>
        <DateCalendar
          onChange={handleDateChange}
        />
      </Dialog>
    </>
  );
}

export default DateHeader;
