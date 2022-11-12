const ArrowDown = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='var(--placeholder)'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='feather feather-chevron-down'
    >
      <polyline points='6 9 12 15 18 9'></polyline>
    </svg>
  )
}

const ArrowUp = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='var(--placeholder)'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      className='feather feather-chevron-up'
    >
      <polyline points='18 15 12 9 6 15'></polyline>
    </svg>
  )
}

const Icons = {
  ArrowDown,
  ArrowUp,
}

export default Icons
