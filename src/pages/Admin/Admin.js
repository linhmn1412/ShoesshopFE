import Card from "./Component/Card";

const Admin = () => {
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
      </div>
  );
};

export default Admin;
