import {
  Box,
  Button,
  Typography
} from '@mui/material';
import NextLink from 'next/link';

export const InAndOutListToolBar = (props) => (
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
        In and Out
      </Typography>
      <Box sx={{ m: 1 }}>
        <NextLink
          href="/"
          passHref
        >
          <Button
            color="primary"
            variant="contained"
          >
            Back
          </Button>
        </NextLink>
      </Box>
    </Box>
  </Box>
);
