import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import BiliBili from '~layouts/bilibili';
import Follow from '~layouts/follow';

export const Router: FC = () => (
  <Routes>
    <Route path='/' element={<Follow />} />
    <Route path='/bili' element={<BiliBili />} />
  </Routes>
);
