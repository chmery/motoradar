import React, { useEffect, useRef, useState } from 'react'
import Icons from '../Icons/Icons'
import styles from './DropdownList.module.scss'

type Props = {
  options: string[]
  title: string
  onSelect: (selected: string) => void
}

const DropdownList = ({ options, title, onSelect }: Props) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<HTMLDivElement>(null)

  const openDropdownHandler = () => setIsDropdownOpen(true)

  const selectOptionHandler = (event: React.MouseEvent) => {
    const selectedOption = (event.target as HTMLDivElement).innerText
    setSelectedOption(selectedOption)
    setIsDropdownOpen(false)
    onSelect(selectedOption)
  }

  useEffect(() => {
    const checkIfClickedOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !selectedRef.current!.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [isDropdownOpen])

  return (
    <div className={styles.dropdown}>
      <span>{title}</span>
      <div
        className={styles.selected}
        onClick={openDropdownHandler}
        ref={selectedRef}
      >
        <span>{selectedOption ? selectedOption : options[0]}</span>
        {!isDropdownOpen && <Icons.ArrowDown />}
        {isDropdownOpen && <Icons.ArrowUp />}
      </div>
      {isDropdownOpen && (
        <div className={styles['dropdown-list']} ref={dropdownRef}>
          {options.map((option) => (
            <div
              className={styles['dropdown-item']}
              onClick={selectOptionHandler}
              key={option}
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownList
