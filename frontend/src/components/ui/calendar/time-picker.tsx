import { Clock } from '@phosphor-icons/react';
import SelectBlank from '@/components/ui/form/select-blank.tsx';
import { generateTimeValues } from '@/utils/time.ts';

const options = generateTimeValues();

const TimePicker = ({selected}) => {
  const Icon = <Clock size={20} fill={"#0D1216"} />;

  return (
    <div className={"h-full py-1 px-2 flex items-center gap-x-2 text-sm"}>
      <SelectBlank options={options}
                   selectedOption={}
                   onChange={}
                   icon={Icon} />
    </div>
  );
};

export default TimePicker;