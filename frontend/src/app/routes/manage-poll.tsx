import Header from '@/components/ui/header/header.tsx';
import ContentWrapper from '@/components/ui/content-wrapper/content-wrapper.tsx';
import Typography from '@/components/ui/typography/typography.tsx';
import Footer from '@/components/ui/footer/footer.tsx';

const ManagePollRoute = () => {
  return (
    <>
      <div className={"bg-gray-100"}>
        <Header className={"bg-gray-100"} />

        <div className={"pt-30 pb-20"}>
          <ContentWrapper>
            <Typography as={"h1"} variant={"h2"}>Manage poll</Typography>

          </ContentWrapper>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ManagePollRoute;