import { Spinner } from "@/components/ui/spinner/spinner";
import { useMeetingPoll } from "../../api/get-poll";
import CalendarDay from "@/components/ui/calendar/calendar-day";
import { Check, Plus, PlusCircle, User } from "@phosphor-icons/react";
import { AvatarIcon } from "@/components/ui/avatar-icon/avatar-icon";
import { InputBlank } from "@/components/ui/form/input-blank";
import VoteSelectButton from "./vote-select-button";
import { MeetingTime, Vote } from "@/types/polls";
import { useState } from "react";
import SelectedVote from "./selected-vote";
import Button from "@/components/ui/button/button";
import classNames from "classnames";
import moment from "moment";
import IconButton from "@/components/ui/button/icon-button";

interface VoteSectionProps {
    pollId: string;
}

const VoteSection = ({ pollId }: VoteSectionProps) => {
    const guestUuid = localStorage.getItem(`${pollId}:guestUuid`) ?? null;
    const meetingPollQuery = useMeetingPoll({ pollId, guestUuid });

    const [vote, setVote] = useState<Vote | null>(null);
    const [isAddingVote, setIsAddingVote] = useState(false);

    if (meetingPollQuery.isLoading) {
        return (
            <div className="flex h-20 w-full items-center justify-center">
                <Spinner />
            </div>
        );
    }

    const meetingPoll = meetingPollQuery?.data;

    if (!meetingPoll) return null;

    const options = meetingPoll.options;
    const lastIndex = options.length - 1;

    console.log("meetingPoll", meetingPoll);

    const renderHeadRow = () => {
        return (
            <tr>
                <th className="sticky left-0 top-0 px-4 min-w-40"></th>
                {options.map((option, index) => {
                    const momentStartTime = moment(option.startTime);
                    const borderClasses = classNames({
                        "border-l": index === 0,
                        "border-r": index === lastIndex
                    });

                    return (
                        <th className={classNames("p-4 border-gray-200 min-w-20", borderClasses)}>
                            <CalendarDay
                                dayNumber={momentStartTime.format('D')}
                                monthName={momentStartTime.format('MMM')}
                                monthColorClassName="bg-gray-300"
                            />

                            <div className="font-normal text-font-dark mt-2">{momentStartTime.format('ddd')}</div>
                            <div className="text-sm/3 text-gray-300 mt-2">
                                <span className="block font-normal">{momentStartTime.format('HH:mm')}</span>
                                <span className="block font-normal">-</span>
                                <span className="block font-normal">{moment(option.endTime).format('HH:mm')}</span>
                            </div>
                        </th>
                    )
                })}
                <th className="sticky top-0 w-full min-w-4"></th>
            </tr>
        )
    }

    const renderParticipantsCountRow = () => {
        return (
            <tr>
                <td className="p-4 min-w-40 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <span>2 participants</span>

                        <IconButton icon={Plus} size={16} color="#5C6872"
                            btnClassName="!p-0.5 -mr-1 border border-gray-200"
                            onClick={() => setIsAddingVote(true)} />
                    </div>
                </td>
                {options.map((option, index) => {
                    const yesVotesCount = 2;
                    const borderClasses = classNames({
                        "border-l": index === 0,
                        "border-r": index === lastIndex
                    });

                    return (
                        <td className={classNames("p-4 border-t border-gray-200 min-w-20", borderClasses)}>
                            <div className="flex items-center gap-x-1">
                                <Check size={18} color="#22c55e" />
                                <span>{yesVotesCount}</span>
                            </div>
                        </td>
                    )
                })}
                <td className="w-full min-w-4"></td>
            </tr>
        )
    }

    const renderAddVoteRow = () => {
        if (!isAddingVote) return null;

        return (
            <tr>
                <td className="p-4 min-w-40 border-t border-gray-200">
                    <div className="flex items-center gap-x-2">
                        <AvatarIcon content={<User size={16} color="#A9A9A9" />} color="gray" />
                        <InputBlank name={'name'} placeholder="Your name" className="flex-1 !px-2 !py-0 !h-8" />
                    </div>
                </td>

                {options.map((_, index) => {
                    const borderClasses = classNames({
                        "border-l": index === 0,
                        "border-r": index === lastIndex
                    });

                    return (
                        <td className={classNames("p-4 border-t border-gray-200 min-w-20", borderClasses)}>
                            <div className="flex items-center justify-center">
                                <VoteSelectButton value={vote} onClick={(vote) => setVote(vote)} />
                            </div>
                        </td>
                    )
                })}
                <td className="w-full min-w-4"></td>
            </tr>
        )
    }

    const renderParticipantRow = (option: MeetingTime) => {
        return (
            <tr>
                <td className="p-4 min-w-40 border-t border-white">
                    <div className="flex items-center gap-x-2">
                        <AvatarIcon content={"Test1"[0].toUpperCase()} color="random" />
                        <span>Test1</span>
                    </div>
                </td>
                <td className="p-2 border-l border-t border-gray-200 min-w-20">
                    <div className="flex justify-center items-center">
                        <SelectedVote value="YES" />
                    </div>
                </td>
                <td className="p-2 border-t border-gray-200 min-w-20 border-r border-gray-200">
                    <div className="flex justify-center items-center">
                        <SelectedVote value="NO" />
                    </div>
                </td>
                <td className="w-full min-w-4"></td>
            </tr>
        )
    }

    return (
        <div className="relative overflow-auto text-font-dark">
            <table className="w-full table-auto border-separate border-spacing-0">
                <thead>
                    {renderHeadRow()}
                </thead>
                <tbody className="text-sm">
                    {renderParticipantsCountRow()}

                    {renderAddVoteRow()}

                    {options.map((option) => (
                        renderParticipantRow(option)
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <td className="px-4 min-w-40"></td>
                        <td className="w-full border-l border-t border-gray-200" colSpan={4}>
                            <div className="text-sm flex items-center justify-between gap-4 p-3">
                                <Button variant="gray-outline" size="small" withAnim={false}>Cancel</Button>

                                <span>Select your availability and click <b>Vote</b></span>

                                <Button variant="primary" size="small" withAnim={false}>Vote</Button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default VoteSection;