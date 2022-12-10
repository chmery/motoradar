import Image from 'next/image';
import styles from './Carousel.module.scss';

import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { useState } from 'react';
import Save from '../Save/Save';

type Props = {
  images: string[];
  listingId: string;
};

const Carousel = ({ images, listingId }: Props) => {
  const [imageNumber, setImageNumber] = useState(0);

  const nextImage = () => {
    if (imageNumber === images.length - 1) {
      setImageNumber(0);
      return;
    }

    setImageNumber((prevImageNumber) => ++prevImageNumber);
  };

  const prevImage = () => {
    if (imageNumber === 0) {
      setImageNumber(images.length - 1);
      return;
    }

    setImageNumber((prevImageNumber) => --prevImageNumber);
  };

  return (
    <div className={styles.container}>
      <Save listingId={listingId} />
      <div className={styles['image-container']}>
        <Image
          src={images[imageNumber]}
          alt='user photo'
          fill
          sizes='100%'
          priority
          className={styles.image}
        />
      </div>
      <div className={`${styles.arrow} `} onClick={prevImage}>
        <MdOutlineArrowBackIosNew />
      </div>
      <div
        className={`${styles.arrow} ${styles['arrow-right']}`}
        onClick={nextImage}
      >
        <MdOutlineArrowForwardIos />
      </div>
      <div className={styles['image-counter']}>{`${imageNumber + 1} / ${
        images.length
      }`}</div>
    </div>
  );
};

export default Carousel;
