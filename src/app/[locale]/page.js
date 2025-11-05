import MetroPagesShowcase from "@/components/main-informations/main-informations";
import FaqAccordion from "@/work/test/questions";
import Mediateka from "./mediateka/headermediateka";
import Header from "@/pages/Header/header";
import HomePage from "@/components/home/HomaPage";
import CompanySlider from "@/components/company/CompanySlider";

const Home = () => {
  return (
    <div className="relative z-[10] ">
      <div>
        <HomePage />
      </div>
      <div className="mt-20">
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
