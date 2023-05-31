import React, { useCallback, useState } from 'react';

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

export const Button = ({ button, updateButton }: ButtonProps): React.ReactElement => {
  const [ isEditing, setIsEditing ] = useState(false);
  const buttonNameRef = useRef<HTMLInputElement>(null);
  const eventDataTypeRef = useRef<HTMLSelectElement>(null);

  console.log(button.eventDataType);

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
        <>
          {button.buttonName}
          <button onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </>
      )}
      {isEditing && (
        <>
          <div className="input-group">
            <label className="input-group__label" htmlFor="buttonName">Button Name</label>
            <input className="input-group__input" type="text" ref={buttonNameRef} defaultValue={`${button.buttonName}`} name="buttonName" />
          </div>
          <div className="input-group">
            <label className="input-group__label" htmlFor="eventDataType">Data Type</label>
            <select className="input-group__input" name="eventDataType" ref={eventDataTypeRef}>
              <option value={EventDataType.RegisterButton} disabled selected={EventDataType.RegisterButton === button.eventDataType}>
                Select Tracking Feature
              </option>
              {EventDataTypeLabels.map(([ eventDataType, label ]) => (
                <option value={eventDataType} selected={button.eventDataType === eventDataType}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <button onClick={handleSaveClick}>Update</button>
          </div>
        </>
      )}
    </div>
  )
};
