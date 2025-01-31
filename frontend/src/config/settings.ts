export interface SettingsItem {
    icon: string;
    text: string;
    defaultValue: boolean;
}

export const SETTINGS_ITEMS: SettingsItem[] = [
    {
        icon: "pi pi-question-circle",
        text: "Allow \"maybe\" answer",
        defaultValue: false
    },
    {
        icon: "pi pi-question-circle",
        text: "Limit selection to one option only",
        defaultValue: false
    },
    {
        icon: "pi pi-question-circle",
        text: "Hide participant list from other participants",
        defaultValue: false
    },
    {
        icon: "pi pi-question-circle",
        text: "Hide scores until after a participant has voted",
        defaultValue: false
    },
];