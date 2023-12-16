import * as React from 'react';
import ProductHero from './modules/views/ProductHero';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';

function Index() {
  return (
    <>
      <AppAppBar ifHome={true} ifAuth={false} />
      <ProductHero />
    </>
  );
}

export default withRoot(Index);
