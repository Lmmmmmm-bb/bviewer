import { FC, useMemo, useState } from 'react';
import styles from './index.module.scss';

interface IUpSpacePaginationProps {
  total: number;
  pageSize: number;
  onPrevClick: (page: number) => void;
  onNextClick: (page: number) => void;
}

const UpSpacePagination: FC<IUpSpacePaginationProps> = (props) => {
  const { total, pageSize, onPrevClick, onNextClick } = props;
  const lastPage = useMemo(() => Math.ceil(total / pageSize), [total]);
  const [current, setCurrent] = useState(1);

  const handlePrevClick = () => {
    setCurrent(current - 1);
    onPrevClick(current - 1);
  };

  const handleNextClick = () => {
    setCurrent(current + 1);
    onNextClick(current + 1);
  };

  return (
    <div className={styles.wrapper}>
      {current !== 1 && (
        <div
          className={`${styles.arrow} ${styles.left}`}
          title='上一页'
          onClick={handlePrevClick}
        >
          上一页
        </div>
      )}
      {current < lastPage && (
        <div
          className={`${styles.arrow} ${styles.right}`}
          title='下一页'
          onClick={handleNextClick}
        >
          下一页
        </div>
      )}
    </div>
  );
};

export default UpSpacePagination;
