import Header from '@/components/ui/header/header.tsx';
import ContentWrapper from '@/components/ui/content-wrapper/content-wrapper.tsx';
import Typography from '@/components/ui/typography/typography.tsx';
import Tag from '@/components/ui/tag/tag.tsx';
import Footer from '@/components/ui/footer/footer.tsx';

const LandingRoute = () => {
  return (
    <>
      <Header />

      <div className={"bg-gray-100 pt-12 pb-20"}>
        <ContentWrapper className={"text-center"}>
          <Typography>Schedule a Meeting</Typography>

          <Typography as={"p"} className={"mt-4"}>
            <span className={"md:block"}>Planning a weekend event or a work meeting? Create a quick poll,</span>
            <span className={"md:block"}> share it with your group, and gather responses effortlessly.</span>
            <span className={"md:block"}> No more long email chains or endless texting.</span>
          </Typography>

          <div className={"mt-4"}>
            <Tag className={"text-sm bg-green"} value="No login needed"></Tag>
          </div>

          <div className={"mt-12 max-w-2xl mx-auto"}>

          </div>
        </ContentWrapper>
      </div>

      <Footer/>
    </>
  );
};

export default LandingRoute;