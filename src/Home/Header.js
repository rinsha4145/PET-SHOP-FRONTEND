import { useNavigate } from "react-router-dom";
import "./Header.css"; 


const Header = () => {
  const navigate=useNavigate();
  return (
    <div className="container" >
     <div> <div className="text-section" >
        <p className="bestsellers">SHOP FOR YOUR</p>
        <h1 className="title">LOVED ONES </h1>
        <button className="shop-now" onClick={()=>navigate('/shop')}>SHOP NOW</button>
      </div></div>
     
    </div>
  );
};

export default Header;
