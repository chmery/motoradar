import styles from 'header.module.scss'

type Props = {
  isAuthorized: boolean
}

const Header = ({ isAuthorized }: Props) => {
  return <h1>Header</h1>
}

export default Header
