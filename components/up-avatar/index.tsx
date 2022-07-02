import type { FC, MouseEvent } from 'react';
import { useStorage } from '@plasmohq/storage';
import type { IUpInfo } from '~types/space-video';
import './index.css';
import { FOLLOW_X_KEY } from '~layouts/follow/config';

interface UpAvatarProps {
  up: IUpInfo;
}

const UpAvatar: FC<UpAvatarProps> = (props) => {
  const { up } = props;
  const [follow, setFollow] = useStorage<IUpInfo[]>(
    FOLLOW_X_KEY,
    (v) => v || []
  );

  const handleVisitUp = () => {
    chrome.tabs.create({
      url: `https://space.bilibili.com/${up.mid}`
    });
  };

  const handleRemoveUp = () => {
    setFollow(follow.filter((v) => v.mid !== up.mid));
  };

  return (
    <div className='up-avatar-wrapper' title={`访问 ${up.name}`}>
      <div className='up-avatar-inner-wrapper' onClick={handleVisitUp}>
        <img className='avatar' src={up.face} alt='up avatar' />
        <p className='up-name'>{up.name}</p>
      </div>
      <button
        className='basic-btn up-avatar-remove'
        title={`删除 ${up.name}`}
        onClick={handleRemoveUp}
      >
        删除
      </button>
    </div>
  );
};

export default UpAvatar;
