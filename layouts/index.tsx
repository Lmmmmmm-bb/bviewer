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

export const Router: FC = () => (
  <Routes>
    <Route path='/' element={WrapperErrorBoundary(Follow)} />
    <Route path='/up/:uid' element={WrapperErrorBoundary(UpSpace)} />
  </Routes>
);
