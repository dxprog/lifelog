import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

const root = createRoot(document.getElementById('reactApp') as HTMLElement);
root.render(<App />);
