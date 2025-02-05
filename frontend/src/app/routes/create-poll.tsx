import Header from '@/components/ui/header/header.tsx';
import ContentWrapper from '@/components/ui/content-wrapper/content-wrapper.tsx';
import Typography from '@/components/ui/typography/typography.tsx';
import Footer from '@/components/ui/footer/footer.tsx';
import { CreatePollForm } from '@/features/polls/components/create-poll-form.tsx';

const CreatePollRoute = () => {
  return (
    <>
      <div className={"bg-gray-100"}>
        <Header className={"bg-gray-100"} />

        <div className={"pt-30 pb-20"}>
          <ContentWrapper>
            <div className={"text-center"}>
              <Typography as={"h1"} variant={"h2"}>Create a meeting poll</Typography>
              <Typography variant={"p"} color={"text-gray-300"} className={"mt-2"}>
                Complete the fields below to create your awesome poll.
              </Typography>
            </div>

            <CreatePollForm />

          </ContentWrapper>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CreatePollRoute;