import { useDateFormatter } from '@app/hooks/useDateFormatter';
import { Button } from '@mui/material';
import React, { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

type DateHeaderProps = {
  selectedDate: Date;
  onDateChange: (newDate: Date) => void;
}

const DateHeader = ({ selectedDate, onDateChange }: DateHeaderProps) => {
  const [ showDatePicker, setShowDatePicker ] = useState(false);
  const { formatMediumDate } = useDateFormatter();

  const handleDateChange = useCallback((newDate: Date) => {
    setShowDatePicker(false);
    onDateChange(newDate);
  }, [ onDateChange, setShowDatePicker ]);

  return (
    <>
      <Button onClick={() => setShowDatePicker(true)} variant="outlined">
        {formatMediumDate(selectedDate)}
      </Button>
      {showDatePicker && (
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          withPortal
          inline
        />
      )}
    </>
  );
}

export default DateHeader;
