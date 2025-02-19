import { Icon } from "@phosphor-icons/react";
import classNames from "classnames";

export interface MultiStateCheckboxOption {
  value: string;
  icon: Icon;
}

interface MultiStateCheckboxBlankProps {
  value: MultiStateCheckboxOption;
  options: MultiStateCheckboxOption[];
  onClick?: (option: MultiStateCheckboxOption) => void;
  className?: string;
};

export const MultiStateCheckboxBlank = ({ value, onClick, options, className = "", ...props }: MultiStateCheckboxBlankProps) => {
  const currentIndex = value ? options.findIndex((opt) => opt.value === value.value) : 0;
  const nextIndex = (currentIndex + 1) % options.length;
  const nextValue = options[nextIndex];

  return (
    <button
      type="button"
      className={classNames("flex size-7 items-center justify-center rounded-md border cursor-pointer ring-gray-200 focus:ring-3", className)}
      onClick={() => onClick?.(nextValue)}
      {...props}>

      {value && <value.icon size={16} weight="bold" />}

    </button>
  );
};