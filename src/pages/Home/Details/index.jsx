import CurItem from '../CurItem';
import { arr } from './config';
import styles from './index.module.scss';

const Details = () => {
  return (
    <div className={styles.detail}>
      <h1>Details Page1</h1>
      <ul>
        {arr?.map((item) => {
          const { id } = item;
          return (
            <li key={id}>
              <CurItem dataSource={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Details;
