import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';

export const CamInactive = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            CAMERAS INACTIVE
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            0
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <ToggleOffTwoToneIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
