import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const InputQuantity = ({ id, max, value, onChangeInput}) => {
  const [quantity, setQuantity] = useState(value);
 

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleIncrease = () => {
    if(quantity < max) {
      setQuantity(quantity + 1);
    }else{
    toast.error("Số lượng đã đạt mức tối đa của sản phẩm này");
    }
  };
  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= max) {
     // console.log("onchange:" , newQuantity);
      setQuantity(newQuantity);
      //onChangeInput(id, newQuantity);
    }
  };
  // useEffect(() => {
   onChangeInput(id, quantity);
  // }, [id, quantity, onChangeInput]);
  return (
    <div className="d-flex">
      <div
        className="btn btn-link primary-text border border-1 px-3 "
        onClick={handleDecrease}
      >
        <i className="fas fa-minus"></i>
      </div>

      <div
        className="form-outline border border-1 mx-1 "
        style={{ width: "50px" }}
      >
        <input
          id=""
          min={1}
          max={max}
          name="quantity"
          value={quantity}
          type="number"
          className="form-control text-center primary-text"
          onChange={handleChange}
        />
      </div>

      <div
        className="btn btn-link primary-text border border-1  px-3"
        onClick={handleIncrease}
      >
        <i className="fas fa-plus"></i>
      </div>
    </div>
  );
};

export default InputQuantity;
