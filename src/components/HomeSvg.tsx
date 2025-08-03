import smartControl from "../assets/home-control.svg";
const HomeSvg = ({ className }: { className?: string }) => {
  return (
    <div className={`my-4  ${className}`}>
      <img
        src={smartControl}
        className="!w-full max-h-[300px] object-cover rounded-md"
        alt="home-image"
      />
    </div>
  );
};

export default HomeSvg;
