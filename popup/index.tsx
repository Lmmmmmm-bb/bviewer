import { FC, useEffect } from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { useFetchType } from '~hooks';
import { Router } from '~layouts';
import './index.scss';

const Popup: FC = () => {
  const navigator = useNavigate();
  const fetchType = useFetchType();

  useEffect(() => {}, []);

  // return <div>{fetchType === 'unusable' ? <Follow /> : <BiliBili />}</div>;
  return (
    <MemoryRouter>
      <Router />
    </MemoryRouter>
  );
};

export default Popup;
