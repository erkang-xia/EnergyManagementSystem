import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import AddDevice from '../../../Add/AddDevice';
import { Button } from '@mui/material';
import AddLocation from '../../../Add/AddLocation';

const rightLink = {
  fontSize: 16,
  color: '#013220',
  ml: 3,
};

function AppAppBar({
  ifHome,
  ifAuth,
  toolbar,
  ifAdd,
  ifLocation,
  locationIds,
  types,
  modelNumbers,
}) {
  return (
    <div>
      <AppBar position="fixed" color="transparent">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* <Box sx={{ flex: 1 }} /> */}
          <Link
            variant="h6"
            underline="none"
            color="success.dark"
            href="/"
            sx={{ mt: ifHome ? 5 : -1, fontSize: ifHome ? 120 : 25 }}
          >
            SHEMS
          </Link>
          <Toolbar />
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {ifLocation ? (
              <Box sx={{ mx: 1 }}>
                {' '}
                <AddLocation />{' '}
              </Box>
            ) : null}

            {ifAdd ? (
              <AddDevice
                locationIds={locationIds}
                types={types}
                modelNumbers={modelNumbers}
              />
            ) : null}
          </Box>

          {ifAuth ? (
            <Box sx={{ fontWeight: 'bold' }}>
              <Link underline="none" href="/login" sx={rightLink}>
                Log Out
              </Link>
            </Box>
          ) : (
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Link variant="h6" underline="none" href="/login" sx={rightLink}>
                {'Log In'}
              </Link>
              <Link
                variant="h6"
                underline="none"
                href="/signup"
                sx={{ ...rightLink, color: 'success.dark' }}
              >
                {'Sign Up'}
              </Link>
            </Box>
          )}

          {toolbar ? toolbar : null}
        </Toolbar>
      </AppBar>
      {/* <Toolbar /> */}
    </div>
  );
}

export default AppAppBar;
