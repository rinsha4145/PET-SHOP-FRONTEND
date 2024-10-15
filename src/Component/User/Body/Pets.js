import React from 'react';
import './Pets.css';
import dog from '../../../Assets/dog.jpg';
import cat from '../../../Assets/cat.png';
import small from '../../../Assets/small.png';
import fish from '../../../Assets/fish.jpg';
import reptile from '../../../Assets/reptile.png';
import bird from '../../../Assets/bird.jpg';
import { useNavigate } from 'react-router-dom';

const categories = [
    { name: 'Dog', image: dog, path: '/dog' },
    { name: 'Cat', image: cat, path: '/cat' },
    { name: 'Small Animal', image: small, path: '/small' },
    { name: 'Fish', image: fish, path: '/fish' },
    { name: 'Reptile', image: reptile, path: '/reptile' },
    { name: 'Bird & Wildlife', image: bird, path: '/bird' },
];

const Pets = () => {
    const navigate = useNavigate();

    const handleclick = (path) => {
        navigate(path);
    };

    return (
        <div className="containerp">
            {categories.map((category) => (
                <div key={category.name} className="category">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="image"
                        onClick={() => handleclick(category.path)} 
                    />
                    <p>{category.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Pets;
