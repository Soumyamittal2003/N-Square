
import Header from "./Header";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";

const HomePage = () => {
  return (
    <div className="">
      <Header />
      <FirstPage />
      <SecondPage />
      <FAQSection/>
      <Testimonials/>
      <Footer/>
    </div>
  );
};

export default HomePage;
