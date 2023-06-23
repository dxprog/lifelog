import { Divider, Drawer, Link, List, ListItem, ListItemButton } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type MainMenuProps = {
  open: boolean;
  onClose: () => void;
};

const MainMenu = ({ open, onClose }: MainMenuProps) => (
  <Drawer open={open} onClose={onClose} anchor="left">
    <List>
      <ListItem>
        <ListItemButton component={RouterLink} to="/events" onClick={onClose}>Event Stream</ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton component={RouterLink} to="/stats" onClick={onClose}>Statistics</ListItemButton>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemButton component={RouterLink} to="/buttons" onClick={onClose}>Update Buttons</ListItemButton>
      </ListItem>
    </List>
  </Drawer>
);

export default MainMenu;
