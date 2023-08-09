import { useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import userImage  from "../../assets/images/user.jpg";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
const AccountProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const [selectedDate, setSelectedDate] = useState(user ? new Date(user.birth) : null);
  const breadcrumbItems = [
    { text: "Trang Chủ", link: "/" },
    { text: "Tài khoản", link: "/account" },
  ];
  const onSubmit = ()=>{

  };
  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />
      <div className="row">
        <div className="col-3 text-center">
          <img src={userImage} className="img-fluid" alt="Sample image" />
          <p className="fw-bold primary-text ">{user ? user.fullname : ""}</p>
          <button
                      type="submit"
                      className="btn btn-success primary-background"
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
              {!loading && user ? (
                <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=" mb-2">
                      <label className="form-label">Tên đăng nhập: </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={user.username}
                        {...register("username", { required: true })}
                      />
                      {errors.username && (
                        <span className="text-danger">
                          Tên đăng nhập không được để trống
                        </span>
                      )}
                    </div>
                    <div className=" mb-2">
                      <label className="form-label">Họ tên: </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={user.fullname}
                        {...register("fullname", { required: true })}
                      />
                      {errors.fullname && (
                        <span className="text-danger">
                          Họ tên không được để trống
                        </span>
                      )}
                    </div>

                    <div className=" mb-2">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        defaultValue={user.email}
                        {...register("email", {
                          required: "Số điện thoại không được để trống!",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Email không đúng định dạng",
                          },
                        })}
                      />
                      {errors.email && (
                        <span className="text-danger">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-2">
                      <label className="form-label">Số điện thoại</label>
                      <input
                        type="text"
                        className="form-control"
                        name="sdt"
                        defaultValue={user.phone_number}
                        {...register("phone_number", {
                          required: "Số điện thoại không được để trống!",
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Số điện thoại phải có đúng 10 chữ số!",
                          },
                        })}
                      />
                      {errors.phone_number && (
                        <span className="text-danger">
                          {errors.phone_number.message}
                        </span>
                      )}
                    </div>
                    <div className="mb-2">
                      <label className="form-label ">Giới tính:</label>
                      &ensp; &ensp;
                      <label>
                        <input
                          type="radio"
                          {...register("gender")}
                          defaultChecked={user.gender === 0}
                        />
                        &ensp;
                        Nam
                      </label>
                      &ensp;
                      <label>
                        <input
                          type="radio"
                          {...register("gender")}
                          defaultChecked={user.gender === 1}
                        />
                        &ensp;
                        Nữ
                      </label>
                    </div>
                    <div className=" mb-4">
                      <label className="form-label">Ngày sinh:</label>
                      &ensp;
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) =>  setSelectedDate(date)}
                        {...register("birth")}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success primary-background"
                    >
                      Lưu
                    </button>
                  </form>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
