import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DeviceEvent from './DeviceEvent';

import Chart from './LineChart';
import BChart from './BarChart';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import Deposits from './Deposits';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const DeviceDash = ({ deviceid }) => {
  const [chartData, setChartData] = React.useState([]);
  const [cost, setCost] = React.useState([]);
  const [barData, setBarData] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const getDeviceMonthlyUsage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/device/${deviceid}`,
          {
            withCredentials: true,
          }
        );

        setChartData(response.data); // Update the chart data with the fetched data
      } catch (error) {
        console.error('Error fetching customer dashboard data:', error);
        setError('Error fetching data');
      }
    };

    const getTypeCost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/deviceTypeCost/${deviceid}`,
          {
            withCredentials: true,
          }
        );

        console.log(response.data);

        setCost(response.data[0].AverageMonthlyConsumption);
      } catch (error) {
        console.error('Error fetching customer dashboard data:', error);
        setError('Error fetching data');
      }
    };

    // const getDeviceTypeUsage = async () => {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:8800/device_type_event/${location_id}`,
    //       {
    //         withCredentials: true,
    //       }
    //     );

    //     setBarData(
    //       response.data.map((item) => ({
    //         name: item.ApplianceType,
    //         pv: item.TotalEnergyConsumed,
    //       }))
    //     );
    //   } catch (error) {
    //     console.error('Error fetching customer dashboard data:', error);
    //     setError('Error fetching data');
    //   }
    // };

    if (deviceid) {
      getDeviceMonthlyUsage();
      console.log(deviceid);
      console.log(chartData);
      getTypeCost();
      // getDeviceTypeUsage();
    }
  }, [deviceid]);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Chart
                data={chartData}
                title={'Monthly Energy Consumption'}
                ylabel={'Energy Used'}
                dataKey="Date"
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Deposits
                cost={cost}
                title="Average Energy Usage"
                comment="Average monthly Usage for this device type"
              />
            </Paper>
            {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <BChart location_id={location_id} />
            </Paper> */}
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default DeviceDash;
