import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Buttons from './pages/buttons';
import EventsPage from './pages/events';

export const App = () => (
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Hey</h1>} />
        <Route path="/buttons" element={<Buttons deviceId="28cdc109c02d" />} />
        <Route path="/events" element={<EventsPage deviceId="28cdc109c02d" />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
