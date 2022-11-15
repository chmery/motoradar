import styles from './Wrapper.module.scss'

type Props = {
  children: React.ReactNode
}

const Wrapper = ({ children }: Props) => {
  return <div className={styles.wrapper}>{children}</div>
}

export default Wrapper
