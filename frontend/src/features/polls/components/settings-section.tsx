import { WaveSine, NumberCircleOne, Question, CalendarX } from '@phosphor-icons/react';
import { PollSettings } from '../types/create-poll';
import SettingsItem, { SettingsItemProps } from './settings-item';
import React from 'react';

const SETTINGS_ITEMS: SettingsItemProps[] = [
  {
    property: 'allowOnlyOneVote',
    icon: WaveSine,
    text: 'Allow "maybe" answer',
    defaultValue: false
  },
  {
    property: 'allowMaybeAnswer',
    icon: NumberCircleOne,
    text: 'Limit selection to one option only',
    defaultValue: false
  },
  {
    property: 'hideOthersAnswers',
    icon: Question,
    text: 'Hide other participants answers',
    defaultValue: false
  },
  {
    property: 'voteDeadline',
    icon: CalendarX,
    text: 'Vote deadline',
    defaultValue: false
  }
];

interface SettingsSectionProps {
  selectedSettings: PollSettings;
  setSelectedSettings: (value: PollSettings) => void;
  className?: string;
}

const SettingsSection = React.forwardRef<HTMLDivElement, SettingsSectionProps>(({ className = '', selectedSettings, setSelectedSettings }: SettingsSectionProps, ref) => {
  const onSettingsItemChange = (propertyName: string, newVal: boolean) => {
    const newSettings = { ...selectedSettings, [propertyName]: newVal };
    setSelectedSettings(newSettings);
  }

  return (
    <div className={`flex flex-col gap-y-3 ${className}`} ref={ref}>
      {SETTINGS_ITEMS.map((item, index) => {
        return <SettingsItem item={item} key={index} onChange={onSettingsItemChange} />;
      })}
    </div>
  );
});

export default SettingsSection;