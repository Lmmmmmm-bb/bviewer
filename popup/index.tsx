import type { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Router } from '~layouts';
import './index.scss';

const Popup: FC = () => {
  return (
    <MemoryRouter>
      <Router />
    </MemoryRouter>
  );
};

export default Popup;
