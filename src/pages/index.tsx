import Filter from 'components/Filter/Filter'
import Wrapper from 'components/UI/Wrapper/Wrapper'
import styles from './index.module.scss'

export default function Home() {
  return (
    <div className={styles.background}>
      <div className={styles.gradient}>
        <Wrapper>
          <div className={styles.filter}>
            <Filter />
          </div>
        </Wrapper>
      </div>
    </div>
  )
}
