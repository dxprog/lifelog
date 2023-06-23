import React, { createContext, useContext, useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import MainMenu from '@app/components/MainMenu';

type AppHeaderProps = {
  children: React.ReactElement;
};

type AppHeaderContext = {
  pageTitle: string;
  setPageTitle: (pageTitle: string) => void;
};

const defaultContext = {
  pageTitle: 'Lifelog',
  setPageTitle: () => {},
};
const AppHeaderContext = createContext<AppHeaderContext>(defaultContext);

const AppHeader = ({ children }: AppHeaderProps) => {
  const [ pageTitle, setPageTitle ] = useState('Lifelog');
  const [ menuOpen, setMenuOpen ] = useState(false);

  const contextValue = {
    pageTitle,
    setPageTitle,
  };

  return (
    <AppHeaderContext.Provider value={contextValue}>
      <Box sx={{ flexGrow: 1 }} marginBottom={8}>
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="h1">{pageTitle}</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <MainMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {children}
    </AppHeaderContext.Provider>
  )
};

export default AppHeader;
export const useAppHeader = () => useContext(AppHeaderContext);
