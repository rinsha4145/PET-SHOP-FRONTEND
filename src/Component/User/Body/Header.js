import { useNavigate } from "react-router-dom";
import './Header.css'
const Header = () => {
  const navigate = useNavigate();

  return (
    <div
      className="container w-[1500px]  flex justify-between bg-no-repeat bg-contain bg-[150px] overflow-x-auto flex-row justify-center font-sans"
>
      <div className="flex-1  pt-[110px] ">
        <p className="text-xl pl-[180px] tracking-[1px] text-[#888] mb-2 ">SHOP FOR YOUR</p>
        <h1 className="text-6xl mr-[780px] font-bold mb-4">LOVED ONES</h1>
        <button
          className="text-xl ml-[180px] border text-black cursor-pointer mb-4 mt-0 px-5 py-2.5 border-solid border-black hover:bg-[#555] hover:text-white"
          onClick={() => navigate('/shop')}
        >
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default Header;
