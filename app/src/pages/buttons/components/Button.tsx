import React, { useCallback, useState } from 'react';
import { Button, Container, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

import { EventDataType } from '@shared/EventDataTypes';
import { IButton } from '@shared/IButton';
import { useRef } from 'react';

type ButtonProps = {
  button: IButton;
  updateButton: (updatedButton: Partial<IButton>) => void;
};

const EventDataTypeLabels = [
  [ EventDataType.BottleFeed, 'Bottle Feed' ],
  [ EventDataType.BreastFeed, 'Breast Feed' ],
  [ EventDataType.Pumping, 'Pumping' ],
  [ EventDataType.DirtyDiaper, 'Dirty Diaper' ],
  [ EventDataType.WetDiaper, 'Wet Diaper' ],
  [ EventDataType.SleepToggle, 'Sleep' ],
];

export const ButtonItem = ({ button, updateButton }: ButtonProps): React.ReactElement => {
  const [ isEditing, setIsEditing ] = useState(false);
  const buttonNameRef = useRef<HTMLInputElement>(null);
  const eventDataTypeRef = useRef<HTMLSelectElement>(null);

  const handleSaveClick = useCallback(() => {
    setIsEditing(false);
    console.log(buttonNameRef.current?.value);
    updateButton({
      ...button,
      buttonName: buttonNameRef.current?.value,
      eventDataType: eventDataTypeRef.current?.value as EventDataType,
    });
  }, [ button, updateButton ]);

  return (
    <div className="button">
      {!isEditing && (
        <Stack direction="row">
          <Typography variant="body1">
            {button.buttonName}
          </Typography>
          <Button onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </Stack>
      )}
      {isEditing && (
        <Stack spacing={2}>
          <TextField label="Button Name" type="text" inputRef={buttonNameRef} defaultValue={`${button.buttonName}`} />
          <FormControl>
            <InputLabel>
              Tracking Feature
            </InputLabel>
            <Select name="eventDataType" inputRef={eventDataTypeRef} value={button.eventDataType}>
              <MenuItem value={EventDataType.RegisterButton} disabled selected={EventDataType.RegisterButton === button.eventDataType}>
                Choose...
              </MenuItem>
              {EventDataTypeLabels.map(([ eventDataType, label ]) => (
                <MenuItem value={eventDataType} selected={button.eventDataType === eventDataType}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleSaveClick} type="submit" variant="contained">
              Update
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outlined">
              Cancel
            </Button>
          </Stack>
        </Stack>
      )}
    </div>
  )
};
