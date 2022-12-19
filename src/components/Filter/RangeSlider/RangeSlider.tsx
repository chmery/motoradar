import styles from './RangeSlider.module.scss';
import { Slider } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
  range: number[];
  defaultValue: number[];
  title: string;
  onChange: (range: number[]) => void;
  step?: number;
};

const RangeSlider = ({ range, title, defaultValue, onChange, step }: Props) => {
  const [value, setValue] = useState(defaultValue);

  const router = useRouter();

  const changeHandler = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    onChange(newValue as number[]);
  };

  return (
    <div
      className={`${styles['range-slider']}  ${
        router.pathname !== '/' && styles.dark
      }`}
    >
      <span className={styles.title}>{title}</span>
      <span className={styles.range}>
        {value[0]} - {value[1]}
      </span>
      <Slider
        step={step}
        min={range[0]}
        max={range[1]}
        value={value}
        onChange={changeHandler}
        valueLabelDisplay='off'
        disableSwap
        sx={{
          color: 'var(--blue)',
          '.MuiSlider-rail, .MuiSlider-track': {
            height: '6px',
          },
        }}
      />
    </div>
  );
};

export default RangeSlider;
