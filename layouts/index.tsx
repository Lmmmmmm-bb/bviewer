import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Follow from '~layouts/follow';

export const Router: FC = () => (
  <Routes>
    <Route path='/' element={<Follow />} />
  </Routes>
);
