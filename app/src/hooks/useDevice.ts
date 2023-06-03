import { createContext, useContext } from 'react';
const DeviceContext = createContext<string>('');
export const DeviceContextProvider = DeviceContext.Provider;
export const useDevice = () => useContext(DeviceContext);
