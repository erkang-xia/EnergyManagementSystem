import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deposits from './Deposits';
import DeviceEvent from './DeviceEvent';

import Chart from './LineChart';
import BChart from './BarChart';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

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
const LocationDash = ({ location_id }) => {
  const [chartData, setChartData] = React.useState([]);
  const [cost, setCost] = React.useState([]);
  const [barData, setBarData] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const getLocationMonthlyUsage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/location/${location_id}`,
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

    const getTotalCost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/cost/${location_id}`,
          {
            withCredentials: true,
          }
        );

        setCost(response.data[0].TotalCost);
      } catch (error) {
        console.error('Error fetching customer dashboard data:', error);
        setError('Error fetching data');
      }
    };

    const getDeviceTypeUsage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/device_type_event/${location_id}`,
          {
            withCredentials: true,
          }
        );

        setBarData(
          response.data.map((item) => ({
            name: item.ApplianceType,
            pv: item.TotalEnergyConsumed,
          }))
        );
      } catch (error) {
        console.error('Error fetching customer dashboard data:', error);
        setError('Error fetching data');
      }
    };

    if (location_id) {
      getLocationMonthlyUsage();
      getTotalCost();
      getDeviceTypeUsage();
    }
  }, [location_id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              style={{
                background: 'linear-gradient(to right bottom,#FFFFFF,#f4fceb)',
              }}
            >
              <Chart
                data={chartData}
                title={'Today Energy Used'}
                ylabel={'Total Energy Used'}
                dataKey="Hour"
              />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
              style={{
                background: 'linear-gradient(to right bottom,#f4fceb, #ECFADC)',
              }}
            >
              <Deposits
                cost={'$' + cost}
                title="Current Cost"
                comment="19 Dec 2023"
              />
            </Paper>
          </Grid>
          {/* Recent DeviceEvent */}
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
              style={{
                background: 'linear-gradient(to right bottom,#f4fceb, #ECFADC)',
              }}
            >
              <DeviceEvent />
            </Paper>
            <Paper
              sx={{ p: 2, mt: 3, display: 'flex', flexDirection: 'column' }}
              style={{
                background:
                  'linear-gradient(to right bottom, #ECFADC,#ECFADC,#ddf7be)',
              }}
            >
              <BChart barData={barData} />
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default LocationDash;
