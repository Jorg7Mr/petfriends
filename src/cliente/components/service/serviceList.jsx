import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "../../styles/service/serviceList.css";
import { Tooltip } from "@material-tailwind/react";
import FormatNumber from "../../common/formatNumber";

const ServiceList = ({ data, allService, setAllService }) => {
  const [showAddCartButton, setShowAddCartButton] = useState(true);

  useEffect(() => {
    const serviceIds = allService.map((item) => item._id);
    if (!serviceIds.includes(data._id)) {
      setShowAddCartButton(true);
    }
  }, [allService, data._id]);

  const handleAddToCartClick = () => {
    setShowAddCartButton(false);
    setAllService((prevService) => [...prevService, data]);
  };

  const handleRemoveFromCartClick = () => {
    setShowAddCartButton(true);
    setAllService((prevCart) =>
      prevCart.filter((item) => item._id !== data._id)
    );
  };

  return (
    <div className="contentService">
      <div className="cardService">
        <div className="contentCardService">
          <img src={data?.image} alt="imageservice" className="imgService" />
          <p className="txtPrice">
            <FormatNumber number={data?.price} />
          </p>
          <p className="titleService">
            <Tooltip content={data?.name} className="tooltipStyle">
              {data?.name.length > 15
                ? `${data?.name.substring(0, 15)}...`
                : data?.name}
            </Tooltip>
          </p>
        </div>
        <div className="contentBtnAddCart">
          {showAddCartButton ? (
            <button className="btnAddCart" onClick={handleAddToCartClick}>
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="custom-icon-cart"
              />
            </button>
          ) : (
            <button className="btnAddCart" onClick={handleRemoveFromCartClick}>
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="custom-icon-cart-add"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
