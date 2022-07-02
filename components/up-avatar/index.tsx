import type { FC } from 'react';
import { useStorage } from '@plasmohq/storage';
import type { IUpInfo } from '~types/space-video';
import { FOLLOW_X_KEY } from '~layouts/follow/config';
import styles from './index.module.scss';
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger
} from 'rctx-contextmenu';

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
    <ContextMenuTrigger id={up.mid.toString()}>
      <div className={styles.wrapper} title={`访问 ${up.name}`}>
        <div className={styles.innerWrapper} onClick={handleVisitUp}>
          <img className={styles.avatar} src={up.face} alt='up avatar' />
          <p className={styles.upName}>{up.name}</p>
        </div>
      </div>
      <ContextMenu
        id={up.mid.toString()}
        className={styles.contextMenu}
        appendTo='body'
        animation='fade'
      >
        <ContextMenuItem
          onClick={handleRemoveUp}
          attributes={{ title: `删除 ${up.name}` }}
        >
          删除
        </ContextMenuItem>
      </ContextMenu>
    </ContextMenuTrigger>
  );
};

export default UpAvatar;
