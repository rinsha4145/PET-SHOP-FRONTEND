import React, { useState } from "react";
import "./Support.css"; 
import { Link } from "react-router-dom";

const Collection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (question) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <div className="faq-container">
      <h1>Common questions</h1>
      <div className="faq-item">
        <h2
          onClick={() => toggleQuestion("q1")}
          className="faq-question">
          1. Where is my order?
        </h2>
        {openQuestion === "q1" && (
          <div className="faq-answer">
            <p>To track your order, you have a couple of convenient options:</p>
            <ul>
              <li>
                Already Signed In? Just head over to{""}
               <Link to="/"> My Account </Link> and find your order details there.
              </li>
              <li>
                Not signed in or guest order? Use the tracking feature{" "}
                <Link to="/"> here </Link>. Just make sure to have your order number and email address ready.
              </li>
            </ul>
            <p>
              And don’t forget, if you’re browsing our Collection page, you can use the handy
              ‘Where is My Order’ section to quickly track your order by entering your
              order number and email address.
            </p>
          </div>
        )}
      </div>
      <div className="faq-item">
        <h2
          onClick={() => toggleQuestion("q2")}
          className="faq-question"
        >
          2. How long do home delivery orders take?
        </h2>
        {openQuestion === "q2" && (
          <div className="faq-answer">
            <p>
            We offer a number of services for home delivery:

            <br/><br/>- Standard delivery: Takes up to 3 days**; you'll receive tracking information in your order confirmation email.

            <br/><br/>- Next day delivery*: Arrives the next day for orders placed before 8pm.

            <br/><br/>*Although next day delivery is available throughout the UK, there are some locations where this service may take longer. Please consider this when placing your order.

            <br/><br/>**Postcodes with extended delivery times (up to 3 working days):

            <br/><br/>AB31-35, AB41-54, AB36-38, AB55-56, All Northern Ireland postcodes (BT prefix), FK17-21, G83, GY9, HS1-9, All Isle of Man postcodes (IM prefix), All Northern Highlands (IV prefix), KA27, KA28, KW0-14, KW15-17, PA20-78, PH15-18, PH19-29, PH32-33, PH45-48, PH30-31, PH34-44, PH49-99, TR21-25, and All Orkney / Shetland (ZE prefix).
            </p>
          </div>
        )}
      </div>
      <div className="faq-item">
        <h2
          onClick={() => toggleQuestion("q3")}
          className="faq-question"
        >
          3. How long does Click & Collect take?
        </h2>
        {openQuestion === "q3" && (
          <div className="faq-answer">
            <p>
            For items available in your local store, we provide the convenience of same-day Click & Collect, in as little as 1 hour.<br/><br/>

If the requested items are not currently in stock at the store, we'll promptly dispatch the products from our warehouse ready for your collection. The time it takes for items to arrive in store may vary by location, but typically:
<br/><br/>
All deliveries will be delivered within 4 days.<br/><br/>

The availability status is clearly indicated on the product page, basket, and checkout. This allows you to assess the expected duration before finalizing your order. If you've already placed an order, refer to your order confirmation email estimated collection.<br/><br/>

*Please be aware that certain stores, due to their specific locations, may take up to 3 working days to receive the items. These locations include Inverurie, Belfast, Bangor NI, Lisburn, Newry, Newtown Abbey, Ballymena, Londonderry, Coleraine, Craigavon, Enniskillen, Isle of Man, Inverness, Elgin, Wick, and Oban.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;