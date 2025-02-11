import { WaveSine, NumberCircleOne, Question, CalendarX, Icon } from '@phosphor-icons/react';
import { Switch } from '@/components/ui/form/switch.tsx';

export interface SettingsItem {
  icon: Icon;
  text: string;
  defaultValue: boolean;
}

const SETTINGS_ITEMS: SettingsItem[] = [
  {
    icon: WaveSine,
    text: 'Allow "maybe" answer',
    defaultValue: false
  },
  {
    icon: NumberCircleOne,
    text: 'Limit selection to one option only',
    defaultValue: false
  },
  {
    icon: Question,
    text: 'Hide other participants answers',
    defaultValue: false
  },
  {
    icon: CalendarX,
    text: 'Vote deadline',
    defaultValue: false
  }
];

interface SettingsSectionProps {
  className?: string;
}

const SettingsSection = ({ className = '' }: SettingsSectionProps) => {
  return (
    <div className={`flex flex-col gap-y-3 ${className}`}>
      {SETTINGS_ITEMS.map((item, index) => {
        return <SettingsItem item={item} key={index} />;
      })}
    </div>
  );
};

const SettingsItem = ({ item }: { item: SettingsItem }) => {
  const Icon = item.icon;
  return (
    <label className={'cursor-pointer flex justify-between items-center gap-x-4 gap-y-2.5 border border-input rounded-md py-2 px-3 hover:bg-gray-100 active:bg-gray-100 select-none'}>
      <Icon size={24} />
      <span className={'flex-1 text-sm'}>{item.text}</span>
      <Switch />
    </label>
  );
};

export default SettingsSection;