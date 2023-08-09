export const formatMoney = (money) => {
  return Number(money).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
