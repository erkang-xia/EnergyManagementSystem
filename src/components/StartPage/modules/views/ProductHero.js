import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://img.freepik.com/free-photo/sustainable-energy-campaign-tree-light-bulb-media-remix_53876-104090.jpg?w=1380&t=st=1701917534~exp=1701918134~hmac=ee5a185ac4b1e9fe95d394d113d9edf7555ade31b8f7b594fde50af66bc2317e';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Increase the network loading priority of the background image. */}

      <Typography align="right" variant="h2" color="#013220">
        Start Save today
      </Typography>
      <Typography
        align="right"
        variant="h5"
        sx={{ mb: 4, ml: 80, mt: { xs: 4, sm: 10 } }}
      >
        a system that helps homeowners efficiently manage their energy
        consumption and reduce electricity bills
      </Typography>
      <Button
        color="success"
        variant="contained"
        size="large"
        component="a"
        href="/signup"
        align="right"
        sx={{ mt: 2, ml: 118, minWidth: 200 }}
      >
        <Typography color="#FFFFFF" sx={{ fontWeight: 'bold' }}>
          Register
        </Typography>
      </Button>
      <Typography variant="body2" sx={{ mt: 2, ml: 110 }}>
        Smart Home Energy Management System
      </Typography>
    </ProductHeroLayout>
  );
}
