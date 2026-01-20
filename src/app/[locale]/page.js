import CompanySlider from "@/components/company/CompanySlider";
import Header from "@/components/header";
import HomePage from "@/components/home/HomaPage";
import ForPageFAq from "@/components/main-informations/forPageFAq";
import MetroPagesShowcase from "@/components/main-informations/main-informations";
import Mediateka from "./mediateka/headermediateka";

const Home = () => {
  return (
    <div className="relative z-[10]   ">
      <HomePage />
      <div className="mt-20">
        <Header />
      </div>
      <div className="my-12">
        <MetroPagesShowcase />
      </div>
      <div>
        <Mediateka />
      </div>
      <div className="pt-10 container ">
        <ForPageFAq />
      </div>
      <div className="my-10 bg-transparent">
        <CompanySlider />
      </div>
    </div>
  );
};

export default Home;
