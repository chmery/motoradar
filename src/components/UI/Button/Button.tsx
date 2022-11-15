import styles from './Button.module.scss'

type Props = {
  text: string
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
}

const Button = ({ text, type, onClick }: Props) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
