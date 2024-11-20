import React from 'react'

function EditShippingStatus() {
    const handleShippingStatusChange = async (orderId, newStatus) => {
        try {
          setShippingStatus((prevStatus) => ({
            ...prevStatus,
            [orderId]: newStatus,
          }));
    
          await updateShippingStatus(orderId, newStatus);
    
        } catch (error) {
    
          console.log("Error updating shipping status:", error);
    
    
          setShippingStatus((prevStatus) => ({
            ...prevStatus,
            [orderId]: shippingStatus[orderId],
          }));
        }
      };
  return (
    
    <div>EditShippingStatus</div>
  )
}

export default EditShippingStatus