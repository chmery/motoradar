import React, { useEffect, useRef, useState } from 'react';
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';
import styles from './DropdownList.module.scss';

type Props = {
  options: string[] | number[];
  title?: string;
  placeholder: string;
  onSelect: (selected: string | number) => void;
  value?: number | string;
  dark?: boolean;
};

const DropdownList = ({
  options,
  title,
  placeholder,
  onSelect,
  dark,
  value,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<number | string | null>(
    null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownHandler = () => setIsDropdownOpen(!isDropdownOpen);

  const selectOptionHandler = (event: React.MouseEvent) => {
    const selectedOption = (event.target as HTMLDivElement).innerText;

    if (typeof options[0] === 'number') {
      const selectedOptionNum = Number(selectedOption);
      setSelectedOption(selectedOptionNum);
      onSelect(selectedOptionNum);
    } else {
      setSelectedOption(selectedOption);
      onSelect(selectedOption);
    }

    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (value) setSelectedOption(value);
  }, [value]);

  useEffect(() => {
    const checkIfClickedOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <span>{title}</span>
      <div className={styles.selected} onClick={dropdownHandler}>
        <span
          className={`${selectedOption && !dark ? styles.active : ''} ${
            selectedOption && dark ? styles['active-dark'] : ''
          }`}
        >
          {selectedOption ? selectedOption : placeholder}
        </span>
        {!isDropdownOpen && <TbChevronDown />}
        {isDropdownOpen && <TbChevronUp />}
      </div>
      {isDropdownOpen && (
        <div className={styles['dropdown-list']}>
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
  );
};

export default DropdownList;
