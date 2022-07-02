import type { FC } from 'react';
import './index.css';

interface IPreviewButtonProps {
  onClick: () => void;
}

const PreviewButton: FC<IPreviewButtonProps> = (props) => {
  return (
    <button className='basic-btn preview-btn' {...props}>
      获取当前视频封面
    </button>
  );
};

export default PreviewButton;
