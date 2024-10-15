import "./Support.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import Collection from '../../../../Assets/self-collect.png';
import product from '../../../../Assets/product-return.png';
import club from '../../../../Assets/pet.png';
import sub from '../../../../Assets/subscription.png';
import app from '../../../../Assets/technical-support.png';
import other from '../../../../Assets/other.png';

const Support = () => {
  const navigate = useNavigate();
  
  const handleclick = (path) => {
    navigate(path);
  };

  const categories = [
    { name: 'Collection & Delivery', image1: Collection, path: '/collection-delivery' },
    { name: 'Refunds & Returns', image1: product, path: '/refunds-returns' },
    { name: 'Pets Club', image1: club, path: '/pets-club' },
    { name: 'Subscription & Repeat Orders', image1: sub, path: '/subscriptions' },
    { name: 'Website & App Support', image1: app, path: '/support' },
    { name: 'Other', image1: other, path: '/other' },
  ];

  return (

    <div className="head">
      <h2>Let me help you</h2>
      <p>Here are our supports for you</p>
      <div  className="icon-container">
      {categories.map((category) => (
        <div key={category.name} className="icon-box">
          <img
            src={category.image1}
            alt={category.name}
            className="image1"
            onClick={() => handleclick(category.path)}
          />
          <p>{category.name}</p></div>
        
      ))}</div>
    </div>
  );
};

export default Support;
