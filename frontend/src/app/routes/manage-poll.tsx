import Header from '@/components/ui/header/header.tsx';
import ContentWrapper from '@/components/ui/content-wrapper/content-wrapper.tsx';
import Footer from '@/components/ui/footer/footer.tsx';
import Alert from '@/components/ui/alert/alert';

const ManagePollRoute = () => {
  return (
    <>
      <div className={"bg-gray-100"}>
        <Header className={"bg-gray-100"} />

        <div className={"pt-30 pb-20"}>
          <ContentWrapper className="max-w-2xl">
            <Alert variant="warning">
              Your administrator rights will be lost if you clear your cookies.
            </Alert>

          </ContentWrapper>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ManagePollRoute;