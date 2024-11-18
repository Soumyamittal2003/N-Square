
import Header from "./Header";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import FourthPage from "./FourthPage";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";
import JoinCommunitySection from "./joincomminunity";

const HomePage = () => {
  return (
    <div className="">
      <Header />
      <FirstPage />
      <SecondPage />
      <ThirdPage />
      <FourthPage />
      <JoinCommunitySection/>
      <FAQSection/>
      <Testimonials/>
      <Footer/>
    </div>
  );
};

export default HomePage;
