import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Follow from './follow';
import UpSpace from './up-space';

export const Router: FC = () => (
  <Routes>
    <Route path='/' element={<Follow />} />
    <Route path='/up/:uid' element={<UpSpace />} />
  </Routes>
);
