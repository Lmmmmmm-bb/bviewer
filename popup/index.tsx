import type { FC } from 'react';
import { useFetchType } from '~hooks';
import BiliBili from '~layouts/bilibili';
import Follow from '~layouts/follow';
import './index.css';

const Popup: FC = () => {
  const fetchType = useFetchType();

  return (
    <div className='wrapper'>
      {fetchType === 'unusable' ? <Follow /> : <BiliBili />}
    </div>
  );
};

export default Popup;
