import { MultiStateCheckboxBlank, MultiStateCheckboxOption } from "@/components/ui/form/multi-state-checkbox-blank";
import { Vote } from "@/types/polls";
import { Check, QuestionMark, X } from "@phosphor-icons/react";

const options: MultiStateCheckboxOption[] = [
    { value: "YES", icon: Check },
    { value: "NO", icon: X },
    { value: "MAYBE", icon: QuestionMark },
];

interface VoteSelectButtonProps {
    value: Vote;
    onClick: (value: Vote) => void;
}

const VoteSelectButton = ({ value, onClick }: VoteSelectButtonProps) => {
    const valueObj = options.find((opt) => opt.value === value) ?? options[0];

    return (
        <MultiStateCheckboxBlank
            options={options}
            value={valueObj}
            onClick={(option) => onClick(option.value as Vote)}
        />
    );
}

export default VoteSelectButton;