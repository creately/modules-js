import React from 'react';
import { Button } from './button';

export default {
  title: 'Button',
  component: Button,
};

export const Default = () => (
  <Button />
);

export const WithText = () => (
  <Button>Hello</Button>
);

export const WithLongText = () => (
  <Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse venenatis, orci ut semper rhoncus, nisi erat euismod metus, eget posuere purus augue vulputate augue. Fusce in enim mauris. Nam interdum nisl nec augue commodo, ac lacinia risus egestas. Cras ullamcorper ultrices mi eu ultricies. Donec finibus in dui id lobortis. Morbi hendrerit condimentum purus, eget euismod velit posuere nec. Nam vestibulum suscipit ante ut feugiat. Phasellus vel metus in metus cursus cursus ut a purus. Nam a elementum est. Aliquam ante enim, fermentum et fringilla faucibus, convallis et augue. Mauris venenatis sollicitudin purus nec porttitor. Nulla eget lacus vel odio tincidunt rhoncus. Nulla ac odio at purus consectetur mollis. Proin id est leo. Ut congue neque lorem, eget dapibus neque maximus sed. </Button>
);
