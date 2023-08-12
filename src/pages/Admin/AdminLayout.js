import Header from "./Component/Header";
import Menu from "./Menu/Menu";

const AdminLayout = ({ children }) => {
  return (
    <div className="position-relative fixed-screen">
      <Header />

      <div className="row" >
        <div className="col-3 p-0 position-relative ">
          <Menu />
        </div>
        <div className="col-9 p-0 mt-70" style={{maxHeight:'calc(100vh - 70px)', overflow:'scroll'}} >{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
