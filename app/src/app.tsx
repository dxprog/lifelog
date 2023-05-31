import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Buttons from './pages/buttons';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Hey</h1>} />
      <Route path="/buttons" element={<Buttons deviceId="28cdc109c02d" />} />
    </Routes>
  </BrowserRouter>
);
