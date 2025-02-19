import { Spinner } from "@/components/ui/spinner/spinner";
import { useMeetingPoll } from "../../api/get-poll";
import CalendarDay from "@/components/ui/calendar/calendar-day";
import { Check, User } from "@phosphor-icons/react";
import { AvatarIcon } from "@/components/ui/avatar-icon/avatar-icon";
import { InputBlank } from "@/components/ui/form/input-blank";
import VoteSelectButton from "./vote-select-button";
import { Vote } from "@/types/polls";
import { useState } from "react";

interface VoteSectionProps {
    pollId: string;
}

const VoteSection = ({ pollId }: VoteSectionProps) => {
    const guestUuid = localStorage.getItem(`${pollId}:guestUuid`) ?? null;
    const meetingPollQuery = useMeetingPoll({ pollId, guestUuid });

    const [vote, setVote] = useState<Vote>("NO");

    if (meetingPollQuery.isLoading) {
        return (
            <div className="flex h-20 w-full items-center justify-center">
                <Spinner />
            </div>
        );
    }

    const meetingPoll = meetingPollQuery?.data;

    if (!meetingPoll) return null;

    return (
        <div className="relative overflow-auto">
            <table className="w-full table-auto border-separate border-spacing-0">
                <thead>
                    <tr>
                        <th className="sticky left-0 top-0 px-4 min-w-40"></th>
                        <th className="sticky top-0 p-4 border-l border-gray-200 min-w-20">
                            <CalendarDay dayNumber="5" monthName="Feb" monthColorClassName="bg-gray-300" />
                            <div className="font-normal text-font-dark mt-2">Wed</div>
                            <div className="text-sm/3 text-gray-300 mt-2">
                                <span className="block font-normal">12:00</span>
                                <span className="block font-normal">-</span>
                                <span className="block font-normal">13:00</span>
                            </div>
                        </th>
                        <th className="sticky top-0 p-4 min-w-20">
                            <CalendarDay dayNumber="6" monthName="Feb" monthColorClassName="bg-gray-300" />
                            <div className="font-normal text-font-dark mt-2">Fri</div>
                            <div className="text-sm/3 text-gray-300 mt-2">
                                <span className="block font-normal">12:00</span>
                                <span className="block font-normal">-</span>
                                <span className="block font-normal">13:00</span>
                            </div>
                        </th>
                        <th className="sticky top-0 p-4 min-w-20">
                            <CalendarDay dayNumber="12" monthName="Feb" monthColorClassName="bg-gray-300" />
                            <div className="font-normal text-font-dark mt-2">Sun</div>
                            <div className="text-sm/3 text-gray-300 mt-2">
                                <span className="block font-normal">12:00</span>
                                <span className="block font-normal">-</span>
                                <span className="block font-normal">13:00</span>
                            </div>
                        </th>
                        <th className="sticky top-0 w-full min-w-4"></th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    <tr>
                        <td className="p-4 min-w-40 border-t border-gray-200">
                            2 participants
                        </td>
                        <td className="p-4 border-l border-t border-gray-200 min-w-20">
                            <div className="flex items-center gap-x-1">
                                <Check size={18} color="#22c55e" />
                                <span>2</span>
                            </div>
                        </td>
                        <td className="p-4 border-t border-gray-200 min-w-20">
                            <div className="flex items-center gap-x-1">
                                <Check size={18} color="#22c55e" />
                                <span>2</span>
                            </div>
                        </td>
                        <td className="p-4 border-t border-gray-200 min-w-20">
                            <div className="flex items-center gap-x-1">
                                <Check size={18} color="#22c55e" />
                                <span>2</span>
                            </div>
                        </td>
                        <td className="w-full min-w-4"></td>
                    </tr>

                    <tr>
                        <td className="p-4 min-w-40 border-t border-gray-200">
                            <div className="flex items-center gap-x-2">
                                <AvatarIcon content={<User size={16} color="#A9A9A9" />} color="gray" />
                                <InputBlank name={'name'} placeholder="Your name" className="flex-1 !px-2 !py-0 !h-8" />
                            </div>
                        </td>
                        <td className="p-4 border-l border-t border-gray-200 min-w-20">
                            <div className="flex items-center gap-x-1">
                                <VoteSelectButton value={vote} onClick={(vote) => setVote(vote)} />
                            </div>
                        </td>
                        <td className="p-4 border-t border-gray-200 min-w-20">
                            <div className="flex items-center gap-x-1">

                            </div>
                        </td>
                        <td className="p-4 border-t border-gray-200 min-w-20">
                            <div className="flex items-center gap-x-1">

                            </div>
                        </td>
                        <td className="w-full min-w-4"></td>
                    </tr>
                </tbody>
            </table>
            <div className="sticky bottom-0 text-sm left-40 flex w-[calc(100%-160px)] items-center justify-between gap-4 border-l border-t border-gray-200 p-3">
                Cancel
                <span>Select your availability and click <b>Vote</b></span>
                Vote
            </div>
        </div>
    );
}

export default VoteSection;