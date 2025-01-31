import Header from '@/components/ui/header/header.tsx';
import ContentWrapper from '@/components/ui/content-wrapper/content-wrapper.tsx';
import Heading from '@/components/ui/heading/heading.tsx';
import Footer from '@/components/ui/footer/footer.tsx';

const CreatePoll = () => {
  return (
    <>
      <Header />

      <div className={"bg-gray-100 pt-12 pb-20"}>
        <ContentWrapper className={"text-center"}>
          <Heading>Schedule a Meeting</Heading>

        </ContentWrapper>
      </div>

      <Footer/>
    </>
  );
};

export default CreatePoll;