import React, { useCallback, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spacer,
  Text,
} from '@chakra-ui/react';

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
    updateButton({
      ...button,
      buttonName: buttonNameRef.current?.value,
      eventDataType: eventDataTypeRef.current?.value as EventDataType,
    });
  }, [ button, updateButton ]);

  return (
    <div className="button">
      {!isEditing && (
        <Flex gap="2">
          <Text fontSize="xl">
            {button.buttonName}
          </Text>
          <Spacer />
          <Button onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </Flex>
      )}
      {isEditing && (
        <>
          <FormControl isRequired>
            <FormLabel>Button Name</FormLabel>
            <Input type="text" ref={buttonNameRef} defaultValue={`${button.buttonName}`} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>
              Tracking Feature
            </FormLabel>
            <Select name="eventDataType" ref={eventDataTypeRef}>
              <option value={EventDataType.RegisterButton} disabled selected={EventDataType.RegisterButton === button.eventDataType}>
                Choose...
              </option>
              {EventDataTypeLabels.map(([ eventDataType, label ]) => (
                <option value={eventDataType} selected={button.eventDataType === eventDataType}>
                  {label}
                </option>
              ))}
            </Select>
          </FormControl>
          <ButtonGroup>
            <Button onClick={handleSaveClick} type="submit" colorScheme="purple">
              Update
            </Button>
            <Button onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </ButtonGroup>
        </>
      )}
    </div>
  )
};
