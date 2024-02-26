import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

export const AccountProfileDetails = (props) => {
  return (
    <Card>
      <CardHeader
        subheader="Information about the detection"
        title="Information"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Detection Type"
              name="detectionType"
              value={props.event_type}
              variant="outlined"
              disabled={true}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Detection Date"
              name="detectionDate"
              value={props.date}
              variant="outlined"
              disabled={true}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Detection Time"
              name="detectionTime"
              value={props.time}
              variant="outlined"
              disabled={true}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={'N/A'}
              variant="outlined"
              disabled={true}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
