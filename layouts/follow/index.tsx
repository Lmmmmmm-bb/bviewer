import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { useStorage } from '@plasmohq/storage';
import { FC, KeyboardEvent, useRef } from 'react';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

import { useFetchType } from '~hooks';
import type { IUpInfo } from '~types';
import BiliBili from '~components/bilibili';
import UpAvatar from '~components/up-avatar';
import { uniqByKey, fetchUpInfo } from '~utils';

import { FOLLOW_X_KEY } from './config';
import styles from './index.module.scss';

const Follow: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [follow, setFollow] = useStorage<IUpInfo[]>(
    FOLLOW_X_KEY,
    (v) => v || []
  );
  const fetchType = useFetchType();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5
      }
    })
  );

  const handleFollowUp = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const uid = e.currentTarget.value;
      if (uid && !follow.some((v) => v.mid.toString() === uid)) {
        const { name, mid, face } = await fetchUpInfo(uid);
        setFollow(uniqByKey([...follow, { name, mid, face }], 'mid'));
      }
      inputRef.current && (inputRef.current.value = '');
    }
  };

  const handleSort = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id !== over.id) {
      const activeIndex = follow.findIndex((v) => v.mid === active.id);
      const overIndex = follow.findIndex((v) => v.mid === over.id);
      const update = arrayMove(follow, activeIndex, overIndex);
      setFollow(update);
    }
  };

  return (
    <div className={styles.wrapper}>
      {fetchType !== 'unusable' && <BiliBili />}
      <input
        ref={inputRef}
        className={styles.uidInput}
        type='number'
        placeholder='通过 UID 添加'
        title='按 Enter 添加'
        onKeyUp={handleFollowUp}
        autoFocus
      />
      <DndContext onDragEnd={handleSort} sensors={sensors}>
        <SortableContext items={follow.map((item) => item.mid)}>
          {follow.map((up) => (
            <UpAvatar key={up.mid} up={up} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Follow;
