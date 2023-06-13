import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Buttons from './pages/buttons';
import EventsPage from './pages/events';
import StatsPage from './pages/stats';
import { DeviceContextProvider } from './hooks/useDevice';

export const App = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Grid>
      <BrowserRouter>
        <DeviceContextProvider value="28cdc109c02d">
          <Routes>
            <Route path="/" element={<h1>Hey</h1>} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </DeviceContextProvider>
      </BrowserRouter>
    </Grid>
  </LocalizationProvider>
);
