import React from "react";
import Select, {
  ActionMeta,
  components,
  ControlProps,
  SingleValue,
} from "react-select";
import classNames from "classnames";
import { SelectOption } from "@/types/forms.ts";

interface SelectBlankProps<T> {
  options: SelectOption<T>[];
  selectedOption: SelectOption<T>;
  onChange: (newValue: SingleValue<SelectOption<T>> | null, actionMeta: ActionMeta<SelectOption<T>>) => void;
  icon?: React.JSX.Element;
}

type ControlType<T> = ControlProps<SelectOption<T>, false> & { selectProps: { icon?: React.JSX.Element } };
type ClassnamesProps = { isDisabled?: boolean; isFocused?: boolean; isSelected?: boolean };

const Control = <T,>({ children, ...props }: ControlType<T>) => {
  const { icon } = props.selectProps;

  return (
    <components.Control {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </components.Control>
  );
};

const SelectBlank = <T,>({ options, selectedOption, onChange, icon, ...props }: SelectBlankProps<T>) => {
  const customClassNames = {
    control: ({ isDisabled, isFocused }: ClassnamesProps) =>
      classNames(
        isDisabled ? "bg-gray-100 border-gray-100" : "bg-white border-accent",
        "flex items-center cursor-default min-h-8 relative transition focus-visible:outline-none",
        "p-1 w-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isFocused && "shadow-[0_0_0_1px] shadow-accent"
      ),

    input: () => "text-gray-200",

    menu: () => "bg-white rounded shadow-[0_0_0_1px_rgba(0,0,0,0.1)] my-1",

    option: ({ isDisabled, isFocused, isSelected }: ClassnamesProps) =>
      classNames(
        isSelected ? "bg-gray-200" : isFocused ? "bg-gray-200" : "bg-transparent",
        isDisabled ? "text-gray-200" : isSelected ? "text-font-black" : "text-inherit",
        "py-2 px-3",
        !isDisabled && (isSelected ? "active:bg-gray-200" : "active:bg-gray-200")
      ),

    placeholder: () => "text-neutral-500 mx-0.5",

    singleValue: ({ isDisabled }: ClassnamesProps) =>
      classNames(
        isDisabled ? "text-neutral-400" : "text-neutral-800 !overflow-visible",
        "mx-0.5"
      ),

    valueContainer: () => "pl-1",
  };

  return (
    <Select<SelectOption<T>>
      value={selectedOption}
      onChange={(newValue, actionMeta) => onChange(newValue, actionMeta)}
      options={options}
      unstyled
      isMulti={false}
      classNames={customClassNames}
      components={{ DropdownIndicator: null, Control }}
      {...icon && {icon}}
      {...props}
    />
  );
};

export default SelectBlank;
