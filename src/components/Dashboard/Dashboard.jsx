import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import AppAppBar from '../StartPage/modules/views/AppAppBar';

// import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarBorder from '@mui/icons-material/StarBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocationDash from './LocationDash';
import DeviceDash from './DeviceDash';

export default function Dashboard() {
  const [open, setOpen] = React.useState({});
  const [locations, setLocations] = React.useState([]);
  const [chartLoca, setChartLoca] = React.useState();
  const [error, setError] = React.useState('');
  const [deviceid, setDevice] = React.useState(-1);
  const [locationIds, setLocationIds] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [modelNumbers, setModelNumbers] = React.useState([]);

  React.useEffect(() => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   setError('User Not Verified');
    //   return;
    // }

    const getCustomerDashboardData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/dashboard/`, {
          withCredentials: true,
        });

        // Group data by LocationID
        const groupedData = response.data.reduce((acc, item) => {
          acc[item.LocationID] = acc[item.LocationID] || [];
          acc[item.LocationID].push(item);
          return acc;
        }, {});

        function extractDistinctAttributes(data) {
          const locationIds = new Set();
          const types = new Set();
          const modelNumbers = new Set();

          data.forEach((item) => {
            if (item.LocationID) locationIds.add(item.LocationID);
            if (item.Type) types.add(item.Type);
            if (item.ModelNumber) modelNumbers.add(item.ModelNumber);
          });

          return {
            distinctLocationIds: Array.from(locationIds).map((id) => ({
              title: `${id}`,
            })),
            distinctTypes: Array.from(types).map((type) => ({ title: type })),
            distinctModelNumbers: Array.from(modelNumbers).map(
              (modelNumber) => ({ title: modelNumber })
            ),
          };
        }

        const { distinctLocationIds, distinctTypes, distinctModelNumbers } =
          extractDistinctAttributes(response.data);

        setLocationIds(distinctLocationIds);
        console.log('here1 ' + distinctLocationIds[0]);
        setTypes(distinctTypes);
        console.log('here2+ ' + distinctTypes[0]);
        setModelNumbers(distinctModelNumbers);

        setLocations(groupedData);
        console.log(response.data);
        // Get the first LocationID
        const firstLocationId = Object.keys(groupedData)[0];
        if (firstLocationId) {
          setChartLoca(firstLocationId); // Use firstLocationId here
        } else {
          setChartLoca('102');
          console.log('No locations found?');
        }
      } catch (error) {
        console.error('Error fetching customer dashboard data:', error);
        setError('Error fetching data');
      }
    };

    getCustomerDashboardData();
  }, []);

  const handleClick = (locationId) => {
    setOpen({ ...open, [locationId]: !open[locationId] });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppAppBar
        ifAuth={true}
        ifAdd={true}
        locationIds={locationIds}
        types={types}
        modelNumbers={modelNumbers}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 2, ml: 2 }}>
        <Toolbar />
        {Object.keys(locations).map((locationId) => (
          <List
            key={locationId}
            sx={{ width: '100%', maxWidth: 360 }}
            component="nav"
          >
            <ListItemButton
              onClick={() => {
                setChartLoca(locationId);
                setDevice(0);
              }}
              sx={{
                ml: -3,
                backgroundColor:
                  chartLoca === locationId ? '#ECFADC' : 'inherit', // Conditional background color
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                sx={{
                  ml: -1,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis', // Apply ellipsis for overflow
                  maxWidth: '200px', // Adjust this width as needed
                }}
                primary={locations[locationId][0].Address}
              />
              {open[locationId] ? (
                <ExpandLess onClick={() => handleClick(locationId)} />
              ) : (
                <ExpandMore onClick={() => handleClick(locationId)} />
              )}
            </ListItemButton>
            <Collapse in={open[locationId]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {locations[locationId].map((device) => (
                  <ListItemButton
                    key={device.DeviceID}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      setDevice(device.DeviceID);
                    }}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Device: ${device.Type} - ${device.ModelNumber}`}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        ))}
      </Box>
      {deviceid > 0 ? (
        <DeviceDash deviceid={deviceid} />
      ) : (
        <LocationDash location_id={chartLoca} />
      )}
    </Box>
  );
}
