import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@mui/material';
import { Download as DownloadIcon } from '../../icons/download';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import NextLink from 'next/link';

export const ProductListToolbar = (props) => (
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
        Live View
      </Typography>
      <Box sx={{ m: 1 }}>
        <NextLink href="/debugger" passHref>
        <Button
          color="primary"
          variant="contained"
        >
          Debugger
        </Button>
        </NextLink>
      </Box>
    </Box>
  </Box>
);
