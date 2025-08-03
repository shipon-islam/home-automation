import Footer from "./components/Footer";
import Header from "./components/Header";
import Router from "./routers/Router";
export default function App() {
  return (
    <div className="mx-2 max-w-[800px] sm:mx-auto ">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}
