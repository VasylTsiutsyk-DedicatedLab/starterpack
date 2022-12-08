import component from './not-found.view';

export default [
  {
    path: '/:catchAll(.*)*',
    name: 'not-found.index',
    component,
  },
];
