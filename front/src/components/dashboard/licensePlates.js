import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import DirectionsCarTwoToneIcon from '@mui/icons-material/DirectionsCarTwoTone';

export const LicensePlates = (props) => (
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
            LICENSE PLATES DETECTED
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            10
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <DirectionsCarTwoToneIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
