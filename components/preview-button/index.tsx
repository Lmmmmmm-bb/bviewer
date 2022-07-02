import type { FC } from 'react';
import styles from './index.module.scss';

interface IPreviewButtonProps {
  onClick: () => void;
}

const PreviewButton: FC<IPreviewButtonProps> = (props) => {
  return (
    <button className={`basic-btn ${styles.previewBtn}`} {...props}>
      获取当前视频封面
    </button>
  );
};

export default PreviewButton;
