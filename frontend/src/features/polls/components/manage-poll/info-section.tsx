import { Spinner } from "@/components/ui/spinner/spinner";
import { useMeetingPoll } from "../../api/get-poll";
import Typography from "@/components/ui/typography/typography";
import { Dot } from "@phosphor-icons/react";
import moment from "moment";

interface InfoSectionProps {
    pollId: string;
}

const InfoSection = ({ pollId }: InfoSectionProps) => {
    const guestUuid = localStorage.getItem(`${pollId}:guestUuid`) ?? null;
    const meetingPollQuery = useMeetingPoll({ pollId, guestUuid });

    if (meetingPollQuery.isLoading) {
        return (
            <div className="flex h-25 w-full items-center justify-center">
                <Spinner />
            </div>
        );
    }

    const meetingPoll = meetingPollQuery?.data;

    if (!meetingPoll) return null;

    const authorName = meetingPoll.user?.name ?? "Guest";
    const createdTime = moment(meetingPoll.createdAt).fromNow();
    return (
        <div>
            <Typography variant="lead">
                {meetingPoll.title}
            </Typography>

            <div className="flex items-center">
                <Typography variant="small" color="text-gray-400">by {authorName}</Typography>
                <Dot size={30} />
                <Typography variant="small" color="text-gray-400">Created {createdTime}</Typography>
            </div>

            {meetingPoll.description && (
                <Typography className="mt-4">
                    {meetingPoll.description}
                </Typography>
            )}
        </div>
    );
}

export default InfoSection;