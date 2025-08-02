import Banner from "./components/Banner";
import Header from "./components/Header";
import HomeSvg from "./components/HomeSvg";
import HomeControl from "./pages/HomeControl";
export default function App() {
  return (
    <div className="mx-2 max-w-[800px] sm:mx-auto ">
      <Header />
      <Banner />
      <HomeControl />
      <HomeSvg />
      <h1 className="text-sm bg-teal-500 absolute w-[96%] left-1/2 -translate-x-1/2 bottom-1.5 py-4 text-center text-teal-800 font-medium uppercase rounded-md">
        Developed by Shipon islam
      </h1>
    </div>
  );
}
