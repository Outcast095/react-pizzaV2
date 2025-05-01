import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = (props) => (
  <ContentLoader
    className={'pizza-block'}
    speed={2}
    width={280}
    height={390}
    viewBox='0 0 280 390'
    backgroundColor='#8b8484'
    foregroundColor='#a99898'
    {...props}
  >
    <circle cx='94' cy='94' r='94' />
    <rect x='2' y='237' rx='3' ry='3' width='189' height='94' />
    <rect x='67' y='345' rx='3' ry='3' width='125' height='33' />
    <rect x='2' y='346' rx='3' ry='3' width='52' height='32' />
    <rect x='4' y='200' rx='3' ry='3' width='183' height='27' />
  </ContentLoader>
);
