import News from "./new";
import NewsSection from "./new";

const Page = () => {
  return (
    <div>
      <div className="container pt-10 py-5">
        <h1 className="text-[36px] font-bold">
          Metropoliten so'ngi yangiliklari
        </h1>
      </div>
      <News />
    </div>
  );
};

export default Page;
