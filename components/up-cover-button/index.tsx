import type { FC } from 'react';
import styles from './index.module.scss';

interface IUpCoverButtonProps {
  onClick: () => void;
}

const UpCoverButton: FC<IUpCoverButtonProps> = (props) => {
  return (
    <button className={`basic-btn ${styles.upBtn}`} {...props}>
      获取当前 UP 背景
    </button>
  );
};

export default UpCoverButton;
