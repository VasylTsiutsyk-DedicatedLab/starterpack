// const component = () => import('./about.view');

import component from './about.view';

export default [
  {
    path: '/about-us',
    name: 'about.index',
    component,
    meta: {
      title: 'About Us',
    },
  },
];
