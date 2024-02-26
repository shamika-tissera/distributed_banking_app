import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { SignOut } from '../auth/signOut';
import { AppConfig } from '../utils/config';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const getNamesByCommaUrl = AppConfig.baseUrl + AppConfig.getNamesSeparatedByComma;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    getName();
  }, []);

  const getName = () => {
    // fetch(getNamesByCommaUrl, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + localStorage.getItem("jwt_token"),
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setFirstName(data.first_name);
    //     setLastName(data.last_name);
    //   })

    setFirstName(localStorage.getItem('username'));
    setLastName("");

  };

  const handleSignOut = () => {
    SignOut();
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' }
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {firstName + " " + lastName}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px'
            },
            padding: '12px 16px'
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
