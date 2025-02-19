import { MultiStateCheckboxBlank, MultiStateCheckboxOption } from "@/components/ui/form/multi-state-checkbox-blank";
import { Vote } from "@/types/polls";
import { Check, QuestionMark, WaveSine, X } from "@phosphor-icons/react";

const initOption: MultiStateCheckboxOption = { value: "NOT_SELECTED", icon: QuestionMark };
const options: MultiStateCheckboxOption[] = [
    { value: "YES", icon: Check },
    { value: "MAYBE", icon: WaveSine },
    { value: "NO", icon: X },
];

const optionClasses: Record<Vote, string> = {
    YES: "border-green text-green",
    MAYBE: "border-yellow text-yellow",
    NO: "border-red/30 text-red",
}

interface VoteSelectButtonProps {
    value: Vote | null | undefined;
    onClick: (value: Vote) => void;
}

const VoteSelectButton = ({ value, onClick }: VoteSelectButtonProps) => {
    const valueObj = options.find((opt) => opt.value === value) ?? options[0];

    if (value) {
        return (
            <MultiStateCheckboxBlank
                options={options}
                value={valueObj}
                onClick={(option) => onClick(option.value as Vote)}
                className={optionClasses[value]}
            />
        );
    }

    return (
        <MultiStateCheckboxBlank
            options={[initOption]}
            value={initOption}
            onClick={() => onClick("YES")}
            className="border-gray-200 text-gray-300"
        />
    );
}

export default VoteSelectButton;