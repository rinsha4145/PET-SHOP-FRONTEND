import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../AxiosIntance';

function ViewProductsFromOrder() {
  const [data, setData] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(`admin/orders/${id}`);
        console.log('API Response:', response.data); 
        setData(response.data.allOrders);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchProducts();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(data.products)) {
    return <div>No products available in this order.</div>;
  }

  return (
    <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mt-0 mx-auto">
      {data.addressID.map((product) => (
        <div key={product._id} className="w-full  min-[400px]:px-6">
          <div className="flex flex-col lg:flex-row items-center  border-b border-gray-200 gap-6 w-full">
            <div className="img-box max-lg:w-full">
              <img
                src={product.productId.image}
                alt={product.productId.productName}
                className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"
              />
            </div>
            <div className="flex flex-row items-center w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                <div className="flex items-center">
                  <div>
                    <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                      {product.productId.productName}
                    </h2>
                    <p className="font-normal text-lg leading-8 text-gray-500 mb-3">
                      By: Paw Shop
                    </p>
                    <div className="flex items-center">
                      <p className="font-medium text-base leading-7 text-black">
                        Qty: <span className="text-gray-500">{product.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-5">
                  <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                    <div className="flex gap-3 lg:block">
                      <p className="font-medium text-sm leading-7 text-black">Price</p>
                      <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                        ${product.productId.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewProductsFromOrder;
