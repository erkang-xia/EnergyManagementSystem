import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';

export default function DeviceEvent() {
  const [chartData, setChartData] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const getDeviceEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/device_event`, {
          withCredentials: true,
        });

        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching device event data:', error);
        setError('Error fetching data');
      }
    };

    getDeviceEvent();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <React.Fragment>
      <Title style={{ color: '#ECFADC' }}>Recent DeviceEvent</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Event ID</TableCell>
            <TableCell>Device ID</TableCell>
            <TableCell>Event Description</TableCell>
            <TableCell align="right">Event Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chartData.map((event) => (
            <TableRow key={event.EventID}>
              <TableCell>{event.Timestamp}</TableCell>
              <TableCell>{event.EventID}</TableCell>
              <TableCell>{event.DeviceID}</TableCell>
              <TableCell>{event.EventType}</TableCell>
              <TableCell align="right">{event.EventValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more events
      </Link> */}
    </React.Fragment>
  );
}
