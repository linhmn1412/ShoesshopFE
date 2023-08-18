import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import userImage  from "../../assets/images/user.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useEffect } from "react";
import { changePassword, updateUserAccount } from "../../services/AuthSlice";
import { toast } from "react-toastify";
import ChangePassword from "./ChangePassword";
const AccountProfile = () => {
  const user = useSelector((state) => state.user.user);
  const successUpdateAccount = useSelector((state) => state.user.successUpdateAccount);
  const dispatch = useDispatch();
  const [initData, setInitData] = useState(null);
  const [showModalChangePassword,setShowModalChangePassword] =useState(false);
  const [errorPassword,serErrorPassword] =useState([]);
  const breadcrumbItems = [
    { text: "Trang Chủ", link: "/" },
    { text: "Tài khoản", link: "/account" },
  ];

  useEffect(()=>{
    if(user){
      setInitData({
        username : user.username,
        fullname : user.fullname,
        email : user.email,
        phone_number : user.phone_number,
        gender : user.gender !== null ? (user.gender === true ? 1 : 0) : null,
        birth : user.birth ? new Date(user.birth) : null,
        address : user.address ? user.address : null,
  
      })
    }
  },[user]);

  const handleUpdateAccount = () =>{
    console.log(initData)
    dispatch(updateUserAccount(initData));
    if(successUpdateAccount) toast.success("Cập nhật thông tin thành công");
  }

const handleChangePassword = (data) => {
  changePassword(data)
  .then((response)=>{
    if(response.status === 200){
      toast.success(response.data.message);
      setShowModalChangePassword(false);
    }else {
      toast.error("Mật khẩu không chính xác.");
      //serErrorPassword(response.data.errors);
    }
  })
}

  if(!initData) return <></>;
  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />
      <div className="row">
        <div className="col-3 text-center">
          <img src={userImage} className="img-fluid" alt="Sample image" />
          <p className="fw-bold primary-text ">{initData.fullname}</p>
          <button
                      type="submit"
                      className="btn btn-success primary-background"
                      onClick={()=> setShowModalChangePassword(true)}
                    >
                      Đổi mật khẩu
                    </button>
        </div>

        <div className="col-9">
          <div className="card mb-3">
            <div className="container">
              <div className="card-header">
                <h5 className="card-title  text-uppercase primary-text" >
                  Tài khoản của tôi:
                </h5>
              </div>
 
                <div className="card-body">
  
                    <div className=" mb-2">
                      <label className="form-label">Tên đăng nhập: </label>
                      <input
                        type="text"
                        className="form-control"
                        value={initData.username}
                        onChange={(e) => setInitData({...initData, username : e.target.value})}
                      />
     
                    </div>
                    <div className=" mb-2">
                      <label className="form-label">Họ tên: </label>
                      <input
                        type="text"
                        className="form-control"
                        value={initData.fullname}
                        onChange={(e) => setInitData({...initData, fullname : e.target.value})}
                      />
                
                    </div>

                    <div className=" mb-2">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={initData.email}
                        onChange={(e) => setInitData({...initData, email : e.target.value})}
              
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label">Số điện thoại</label>
                      <input
                        type="text"
                        className="form-control"
                        value={initData.phone_number}
                        onChange={(e) => setInitData({...initData, phone_number : e.target.value})}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label ">Giới tính:</label>
                      &ensp; &ensp;
                      <label>
                        <input
                          type="radio"
                          checked={initData.gender === 0}
                          onChange={() => setInitData({ ...initData, gender: 0 })}
                        />
                        &ensp;
                        Nam
                      </label>
                      &ensp;
                      <label>
                        <input
                          type="radio"
                          checked={initData.gender === 1}
                          onChange={() => setInitData({ ...initData, gender: 1 })}
                        />
                        &ensp;
                        Nữ
                      </label>
                    </div>
                    <div className=" mb-2">
                      <label className="form-label">Ngày sinh:</label>
                      &ensp;
                      <DatePicker
                        selected={initData.birth || new Date("1990-01-01")}
                        onChange={(date) => setInitData({...initData, birth : date})}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>

                    <div className=" mb-4">
                      <label className="form-label">Địa chỉ:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={initData.address || ''}
                        onChange={(e) => setInitData({...initData, address : e.target.value})}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success primary-background"
                      onClick={ handleUpdateAccount}
                    >
                      Lưu
                    </button>

                </div>
            </div>
          </div>
        </div>
      </div>
      {showModalChangePassword && (
      <ChangePassword
        error = {errorPassword}
        show={showModalChangePassword}
        handleClose={()=>setShowModalChangePassword(false)}
        handleChangePassword = {handleChangePassword}
      />
    )}
    </div>
  );
};

export default AccountProfile;
