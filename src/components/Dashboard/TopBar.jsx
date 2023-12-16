import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../StartPage/modules/components/AppBar';
import Toolbar from '../StartPage/modules/components/Toolbar';

const rightLink = {
  fontSize: 16,
  color: '#013220',
  ml: 3,
};

function TopBar({ ifHome, ifAuth, toolbar }) {
  return (
    <div>
      <AppBar position="fixed" color="transparent">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* <Box sx={{ flex: 1 }} /> */}
          <Link
            variant="h6"
            underline="none"
            color="success.dark"
            href="/signup"
            sx={{ mt: ifHome ? 5 : -1, fontSize: ifHome ? 120 : 25 }}
          >
            {'SHEMS'}
          </Link>

          {ifAuth ? (
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Link variant="h6" underline="none" href="/login" sx={rightLink}>
                {'Log Out'}
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

export default TopBar;
