import React from 'react';
import { Box, Card, CardContent, CardMedia, Divider, Stack, Typography } from "@mui/material";

import EventIcon, { IconSize } from '@app/components/EventIcon';
import { ButtonLabelMap, EventStat } from '@app/hooks/types';

import './styles.scss';

type RollupCardProps = {
  stat: EventStat;
  buttonLabels: ButtonLabelMap;
};

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

const RollupCard = ({ stat, buttonLabels }: RollupCardProps) => {
  const countLabel = `${stat.count} time${stat.count !== 1 ? 's' : ''}`;
  return (
    <Card className={`rollup-card rollup-card--${stat.eventDataType}`}>
      <CardMedia>
        <Box className="rollup-card__header">
          <EventIcon eventDataType={stat.eventDataType} size={IconSize.XLarge} />
        </Box>
      </CardMedia>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {buttonLabels[stat.eventDataType]}
        </Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Typography variant="body2">
            {stat.duration && (formatDuration(stat.duration))}
            {!stat.duration && countLabel}
          </Typography>
          {stat.duration && <Typography variant="body2">{countLabel}</Typography>}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default RollupCard;
