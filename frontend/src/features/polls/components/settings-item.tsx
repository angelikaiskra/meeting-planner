import { Switch } from "@/components/ui/form/switch";
import { Icon } from "@phosphor-icons/react";

export interface SettingsItemProps {
    property: string;
    icon: Icon;
    text: string;
    defaultValue: boolean;
}

type onChangeType = (propertyName: string, newVal: boolean) => void;

const SettingsItem = ({ item, onChange }: { item: SettingsItemProps, onChange: onChangeType }) => {
    const Icon = item.icon;
    return (
        <label className={'cursor-pointer flex justify-between items-center gap-x-4 gap-y-2.5 border border-input rounded-md py-2 px-3 hover:bg-gray-100 active:bg-gray-100 select-none'}>
            <Icon size={24} />
            <span className={'flex-1 text-sm'}>{item.text}</span>
            <Switch onChange={(e) => onChange(item.property, e.target.checked)} />
        </label>
    );
}

export default SettingsItem;