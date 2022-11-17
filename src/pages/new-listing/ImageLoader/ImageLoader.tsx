import Button from 'components/UI/Button/Button';
import { BsPlus } from 'react-icons/bs';
import styles from './ImageLoader.module.scss';

const ImageLoader = () => {
  return (
    <div className={styles['image-loader']}>
      <Button text={'Upload Images'} icon={<BsPlus />} />
    </div>
  );
};

export default ImageLoader;
