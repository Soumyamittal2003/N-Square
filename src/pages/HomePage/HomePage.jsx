import Header from "./Header";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import FourthPage from "./FourthPage";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";
import JoinCommunitySection from "./joincomminunity";
import FifthPage from "./FifthPage";
import SixthPage from "./SixthPage";
import SeventhPage from "./SeventhPage";
import EighthPage from "./EighthPage";

const HomePage = () => {
  return (
    <div className="">
      <Header />
      <FirstPage />
      <SecondPage />
      <ThirdPage />
      <FourthPage />
      <FifthPage />
      <SixthPage />
      <SeventhPage />
      <EighthPage />
      <JoinCommunitySection />
      <FAQSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
