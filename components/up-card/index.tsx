import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger
} from 'rctx-contextmenu';
import type { FC } from 'react';

import type { FollowingInfoType } from '~types';

import styles from './index.module.scss';

interface IUpCardProps {
  up: FollowingInfoType;
  selected?: boolean;
  onClick?: () => void;
}

const UpCard: FC<IUpCardProps> = (props) => {
  const { up, selected = false, onClick } = props;

  const handleVisitUp = () => {
    chrome.tabs.create({ url: `https://space.bilibili.com/${up.mid}` });
  };

  return (
    <ContextMenuTrigger id={up.mid.toString()}>
      <div
        className={`${styles.wrapper} ${selected ? styles.select : ''}`}
        onClick={onClick}
      >
        <img className={styles.avatar} src={up.face} />
        <div className={styles.contentWrapper}>
          <h3 className={`${styles.section} ${styles.name}`} title={up.uname}>
            {up.uname}
          </h3>
          <p className={`${styles.section} ${styles.sign}`} title={up.sign}>
            {up.sign}
          </p>
        </div>
      </div>

      <ContextMenu id={up.mid.toString()} appendTo='body' animation='fade'>
        <ContextMenuItem
          attributes={{ title: `访问 ${up.uname} 主页` }}
          onClick={handleVisitUp}
        >
          {`访问 ${up.uname}`}
        </ContextMenuItem>
      </ContextMenu>
    </ContextMenuTrigger>
  );
};

export default UpCard;
