import { BASE_URL } from "../../services";
import { revenueStatistics, topSellingProducts } from "../../services/productService";
import Card from "./Component/Card";
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'
let initialData = [0,0,0,0,0,0,0,0,0,0,0,0]
function updateInitialData(dataArray, newDataArray) {
  for (let i = 0; i < newDataArray.length; i++) {
    const monthIndex = newDataArray[i].month - 1; // Month index is 0-based
    const totalRevenue = newDataArray[i].total_revenue;
    
    if (dataArray[monthIndex] !== undefined) {
      dataArray[monthIndex] = totalRevenue;
    }
  }
  return dataArray
}
const Admin = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [revenue, setRevenue] = useState([]);
  useEffect(() => {
    topSellingProducts()
    .then((data)=>{
      setTopProducts(data.top_selling_products);
    });
    revenueStatistics()
    .then((data)=>{
      setRevenue(data);
    })
  }, []);
  const data = {
    labels:[
      "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
      "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ],
    datasets: [
      {
        label: 'Doanh thu',
        data: updateInitialData(initialData,revenue),
        fill: false,
        borderColor: '#185137',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
      <div className="px-4 py-5">
        <div className="row" >
        <Card title="Đơn hàng" statistic="66" icon="fas fa-clipboard-list" />
          <Card title="Thương hiệu" statistic="3" icon="fas fa-calendar" />
          <Card
            title="Danh mục giày"
            statistic="6"
            icon="fas fa-clipboard-list"
          />
          <Card title="Giày" statistic="20" icon="fas fa-clipboard-list" />
          <Card title="Khuyến mãi" statistic="6" icon="fas fa-clipboard-list" />
        </div>
        <div className="row mb-5">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-title primary-background text-white text-uppercase p-3">Top sản phẩm bán chạy nhất trong tháng</div>
              <div className="card-body">
              {topProducts && topProducts.map((val)=> (
                <div key= {val.id_shoe} className="row p-2 border-bottom border-1 align-items-center">
                  <div className="col-10">
                    <div className="primary-text fw-bold">{val.name_shoe}</div>
                    <div className="text-muted">Đã bán:&ensp;{val.total_quantity}</div>
                  </div>
                  <div className="col-2 ">
                    <img src={`${BASE_URL}/product/${val.id_shoe}/image`} alt=""  width="80px" height="80px" className="float-end"/>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
        <div clasName="w-100">
        <Line data={data} options={options} />
        </div>
      </div>
  );
};

export default Admin;
