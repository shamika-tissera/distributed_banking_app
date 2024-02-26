import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import { AppConfig } from "../../utils/config";
import { useEffect, useState } from 'react';

export const UnfamiliarFaces = (props) => {
  const getEventCountsForChartUrl = AppConfig.baseUrl + AppConfig.eventCountForDayEndpoint;
  const[data, setData] = useState(0);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getEventCountsForChartUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {

        setData(data[0]["event_count"]);        

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  else {
    return (
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
                TOTAL EVENT COUNT
              </Typography>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {data}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  height: 56,
                  width: 56
                }}
              >
                <PermIdentityTwoToneIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
