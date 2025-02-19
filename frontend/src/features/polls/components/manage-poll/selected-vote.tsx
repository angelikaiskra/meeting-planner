import { Vote } from "@/types/polls";
import { Check, QuestionMark, WaveSine, X } from "@phosphor-icons/react";
import classNames from "classnames";

interface SelectedVoteProps {
    value: Vote;
}

const commonClasses = "h-6 w-6 flex justify-center items-center rounded-full p-1";

const SelectedVote = ({ value }: SelectedVoteProps) => {
    switch (value) {
        case "YES":
            return (
                <div className={classNames(commonClasses, "bg-green/10 text-green")}>
                    <Check size={14} weight="bold" />
                </div>
            );
        case "MAYBE":
            return (
                <div className={classNames(commonClasses, "bg-yellow/15 text-yellow")}>
                    <WaveSine size={14} weight="bold" />
                </div>
            );
        case "NO":
            return (
                <div className={classNames(commonClasses, "bg-red/10 text-red")}>
                    <X size={14} weight="bold" />
                </div>
            );
        default:
            return (
                <div className={classNames(commonClasses, "bg-gray-200/10 text-gray-300")}>
                    <QuestionMark size={14} />
                </div>
            );
    }
}

export default SelectedVote;