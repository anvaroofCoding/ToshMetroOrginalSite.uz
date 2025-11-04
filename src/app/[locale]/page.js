import MetroPagesShowcase from "@/components/main-informations/main-informations";
import CompanySlider from "@/pages/company/CompanySlider";
import MetroCarouselWithNews from "@/pages/Header/header";
import FaqAccordion from "@/work/test/questions";
import Mediateka from "./mediateka/headermediateka";
import Header from "@/pages/Header/header";

const Home = () => {
  return (
    <div className="relative z-[10] ">
      <div className="mt-5">
        <Header />
      </div>
      <div className="my-12">
        <MetroPagesShowcase />
      </div>
      <div>
        <Mediateka />
      </div>
      <div className="my-10">
        <FaqAccordion />
      </div>
      <div className="my-10 bg-transparent">
        <CompanySlider />
      </div>
    </div>
  );
};

export default Home;
