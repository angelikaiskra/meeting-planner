import Select, { components } from 'react-select';
import { Icon } from '@phosphor-icons/react';
import classNames from 'classnames';

interface Option {
  label: string;
  value: string;
}

interface SelectBlankProps {
  options: Option[];
  selectedOption: Option;
  onChange: (newOption) => void;
  icon?: Icon | undefined;
}

const Control = ({ children, ...props }) => {
  const { icon } = props.selectProps;

  return (
    <components.Control {...props}>
      <span className={''}>{icon}</span>
      {children}
    </components.Control>
  );
};

const SelectBlank = ({ options, selectedOption, onChange, icon }: SelectBlankProps) => {
  const iconProp = icon ? { icon: icon } : {};
  const customClassNames = {
    control: ({ isDisabled, isFocused }) => classNames(
        isDisabled ? 'bg-gray-100 border-gray-100' : 'bg-white border-accent',
        'flex items-center cursor-default min-h-8 relative transition focus-visible:outline-none',
        'p-1', 'w-full', 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isFocused && 'shadow-[0_0_0_1px] shadow-accent',
      ),
    input: () => classNames('text-gray-200'),
    menu: () =>
      classNames(
        'bg-white',
        'rounded',
        'shadow-[0_0_0_1px_rgba(0,0,0,0.1)]',
        'my-1'
      ),
    option: ({ isDisabled, isFocused, isSelected }) =>
      classNames(
        isSelected
          ? 'bg-gray-200'
          : isFocused
            ? 'bg-gray-200'
            : 'bg-transparent',
        isDisabled
          ? 'text-gray-200'
          : isSelected
            ? 'text-font-black'
            : 'text-inherit',
        'py-2',
        'px-3',
        !isDisabled &&
        (isSelected ? 'active:bg-gray-200' : 'active:bg-gray-200')
      ),
    placeholder: () => classNames('text-neutral-500', 'mx-0.5'),
    singleValue: ({ isDisabled }) =>
      classNames(
        isDisabled ? 'text-neutral-400' : 'text-neutral-800 !overflow-visible',
        'mx-0.5'
      ),
    valueContainer: () => classNames('pl-1')
  };

  return (
    <Select
      value={selectedOption}
      onChange={onChange}
      options={options}
      unstyled={true}
      classNames={customClassNames}
      components={{
        DropdownIndicator: null,
        Control
      }}
      {...iconProp}
    />
  );
};

export default SelectBlank;