import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Buttons from './pages/buttons';
import EventsPage from './pages/events';
import StatsPage from './pages/stats';
import { DeviceContextProvider } from './hooks/useDevice';

export const App = () => (
  <ChakraProvider>
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
  </ChakraProvider>
);
