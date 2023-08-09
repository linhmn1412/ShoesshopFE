export  const getPriceDiscount = (price, discount) => {
    return price - price * discount * 0.01;
  };