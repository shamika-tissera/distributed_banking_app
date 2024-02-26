import { Avatar, Box, Card, CardContent, Grid, Tooltip, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import { useState } from 'react';
import { videoSources } from '../../__mocks__/videoSources';

export const CamActive = (props) => {

  const[data, setData] = useState(0);
  const[loading, setLoading] = useState(false);

  if (loading) {
    return <div>Loading...</div>
  }
  else {
    return (
      <Card
        sx={{ height: '100%' }}
        {...props}
      >
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Tooltip title="The number of cameras registered in the system">
              <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="overline"
              >
                CAMERAS REGISTERED
              </Typography>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {videoSources.length}
              </Typography>
            </Grid>
            </Tooltip>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: 'success.main',
                  height: 56,
                  width: 56
                }}
              >
                <ToggleOnTwoToneIcon />
              </Avatar>
            </Grid>
          </Grid>
          
        </CardContent>
      </Card>
    );
  }
}
