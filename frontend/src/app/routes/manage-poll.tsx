import Header from '@/components/ui/header/header.tsx';
import ContentWrapper from '@/components/ui/content-wrapper/content-wrapper.tsx';
import Footer from '@/components/ui/footer/footer.tsx';
import Alert from '@/components/ui/alert/alert';
import VoteSection from "@/features/polls/components/manage-poll/vote-section";
import { useParams } from "react-router";
import InfoSection from "@/features/polls/components/manage-poll/info-section";

const ManagePollRoute = () => {
  const params = useParams();
  const pollId = params.pollId as string;

  return (
    <>
      <div className={"bg-gray-100"}>
        <Header className={"bg-gray-100"} />

        <div className={"pt-36 pb-20"}>
          <ContentWrapper className="max-w-2xl space-y-5">
            <Alert variant="warning">
              Your administrator rights will be lost if you clear your cookies.
            </Alert>

            <div className="px-6 pt-4 pb-5 border border-gray-200 rounded-lg bg-white">
              <InfoSection pollId={pollId} />
            </div>

            <div className="border border-gray-200 rounded-lg bg-white">
              <VoteSection pollId={pollId} />
            </div>

            {/* <ShareSection /> */}

          </ContentWrapper>
        </div >
      </div >

      <Footer />
    </>
  );
};

export default ManagePollRoute;