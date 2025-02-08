import { Clock } from '@phosphor-icons/react';
import SelectBlank from '@/components/ui/form/select-blank.tsx';
import { generateTimeValues } from '@/utils/time.ts';
import { ActionMeta, SingleValue } from 'react-select';
import { SelectOption } from '@/types/forms.ts';
import { TimeValue } from '@/types/time.ts';

const options = generateTimeValues();

interface TimePickerProps {
  selectedOption: SelectOption<TimeValue>;
  onChange: (newValue: SingleValue<SelectOption<TimeValue>>, actionMeta: ActionMeta<SelectOption<TimeValue>>) => void;
}

const TimePicker = ({ selectedOption, onChange, ...props }: TimePickerProps) => {
  const icon = <Clock size={20} fill={'#0D1216'} />;

  return (
    <div className={'h-full py-1 px-2 flex items-center gap-x-2 text-sm [&>div]:min-w-18'}>
      <SelectBlank<TimeValue>
        options={options}
        selectedOption={selectedOption}
        onChange={onChange}
        icon={icon}
        {...props}
      />
    </div>
  );
};

export default TimePicker;