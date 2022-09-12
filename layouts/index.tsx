import type { FC, PropsWithChildren } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from '~components/error-boundary';
import Follow from './follow';
import UpSpace from './up-space';

const WrapperErrorBoundary = (FunctionComponent: FC) => (
  <ErrorBoundary>
    <FunctionComponent />
  </ErrorBoundary>
);

const _Router: FC = () => (
  <Routes>
    <Route path='/' element={<Follow />} />
    <Route path='/up/:uid' element={<UpSpace />} />
  </Routes>
);

export const Router = WrapperErrorBoundary(_Router);
