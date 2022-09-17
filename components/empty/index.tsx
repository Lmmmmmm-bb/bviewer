import type { FC } from 'react';

import styles from './index.module.scss';

interface IEmptyProps {
  content: string;
}

const Empty: FC<IEmptyProps> = (props) => (
  <div
    className={styles.wrapper}
    style={{ content: 'Hello' }}
    data-content={props.content}
  />
);

export default Empty;
