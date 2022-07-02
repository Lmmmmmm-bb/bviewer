import type { FC } from 'react';
import './index.css';

interface IUpCoverButtonProps {
  onClick: () => void;
}

const UpCoverButton: FC<IUpCoverButtonProps> = (props) => {
  return (
    <button className='basic-btn up-btn' {...props}>
      获取当前 UP 背景
    </button>
  );
};

export default UpCoverButton;
