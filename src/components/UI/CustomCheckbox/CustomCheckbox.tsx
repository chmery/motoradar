import { Checkbox } from '@mui/material'
import { ChangeEvent } from 'react'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import styles from './CustomCheckbox.module.scss'

type Props = {
  label: string
  onChange: (isChecked: boolean) => void
}

const CustomCheckbox = ({ label, onChange }: Props) => {
  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    isChecked: boolean
  ) => onChange(isChecked)

  const capitalizedLabel = `${label[0].toUpperCase()}${label.slice(1)}`

  return (
    <div className={styles.checkbox}>
      <Checkbox
        disableRipple
        checkedIcon={<ImCheckboxChecked />}
        icon={<ImCheckboxUnchecked />}
        sx={{
          color: 'var(--placeholder)',
          svg: { fontSize: '1.5rem' },
          '&.MuiButtonBase-root': {
            background: 'transparent',
            padding: '0',
          },
          '&.Mui-checked': { color: 'var(--blue)', background: '#fff' },
        }}
        inputProps={{
          'aria-label': `${label}`,
        }}
        onChange={onChangeHandler}
      />
      <span className={styles.text}>{capitalizedLabel}</span>
    </div>
  )
}

export default CustomCheckbox
