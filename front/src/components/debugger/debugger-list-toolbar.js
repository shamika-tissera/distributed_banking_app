import {
  Box,
  Button,
  Typography,
  Snackbar
} from '@mui/material';
import NextLink from 'next/link';
import { useState } from 'react';
import { videoSources } from "../../__mocks__/videoSources";

export let infoToDisplay = videoSources;
export const DebuggerListToolbar = (props) => {

  // this is to handle the click event on 'Test on Demo Data' button
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
    infoToDisplay = videoSources;
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Detection Engine Debugger
        </Typography>
        <Box
          sx={{ m: 1 }}
        >
          <Button
            color="secondary"
            variant="contained"
            sx={{ mr: 1 }}
            onClick={handleClick}
          >
            Test on Demo Data
          </Button>
          <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={6000}
            message="You are now testing on demo data!"
          />
          <NextLink
            href="/live_view"
            passHref
          >
            <Button
              color="primary"
              variant="contained"
            >
              Back to Live View
            </Button>
          </NextLink>
        </Box>
      </Box>
    </Box>
  )
};
