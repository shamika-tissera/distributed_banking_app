import { Line } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { AppConfig } from "../../utils/config";

export const CumulativeFaceCount = (props) => {
  const getEventCountsForChartUrl = AppConfig.baseUrl + AppConfig.eventCountForChartEndpoint;

  const theme = useTheme();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let fetchedData = {};
    fetch(getEventCountsForChartUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        fetchedData = data;

        setData({
          datasets: [
            {
              backgroundColor: '#3F51B5',
              barPercentage: 0.5,
              barThickness: 12,
              borderRadius: 4,
              categoryPercentage: 0.5,
              data: fetchedData.today,
              label: 'Today',
              maxBarThickness: 10
            },
            {
              backgroundColor: '#EEEEEE',
              barPercentage: 0.5,
              barThickness: 12,
              borderRadius: 4,
              categoryPercentage: 0.5,
              data: fetchedData.yesterday,
              label: 'Yesterday',
              maxBarThickness: 10
            }
          ],
          labels: ['12 AM', '8 AM', '10 AM', '12 PM', '3 PM', '6 PM', '11 PM']
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }
  else {
    return (
      <Card {...props}>
        <CardHeader
          title="Event Count"
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 400,
              position: 'relative'
            }}
          >
            <Line
              data={data}
              options={options}
            />
          </Box>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
        </Box>
      </Card>
    );
  }
};
