import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../layouts/Wrapper";
import {
  getAllUser,
  deleteUser,
} from "../../redux/actions/crudOperationAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateUser from "../../components/UpdateUserView";
import CustomAlert from "../../components/CustomAlert";
import type { RootState } from "../../redux/reducers/rootReducer";
import "./index.scss";

const Home = () => {
  const allUserData = useSelector((state:RootState) => state.allUserData);
  const dispatch = useDispatch();
  const [selecteddata, setSelectedData] = useState<any>();
  const [dataToUpdate, setDataToUpdate] = useState<any>();
  const [dataToDelete, setDataToDelete] = useState<any>();
  const [data, setData] = useState<any>();
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  useEffect(() => {
    const data =
      allUserData.allUserData.result && allUserData.allUserData.result.data;
    setData(data);
  }, [allUserData.allUserData.result]);

  const callOpenDeleteAlert = (e:any) => {
    setDataToDelete(e)
    setOpenDeleteAlert(true)
  }

  const deleteUserData = () => {
    const obj = {
      id: dataToDelete._id
    };
    dispatch(deleteUser(obj));
    setOpenDeleteAlert(false);
    dispatch(getAllUser());
    toast("Data Sucessfully Delete !");
  };

  const callUserUpdate = (e:any) => {
    setDataToUpdate(e);
    setOpenUpdateForm(!openUpdateForm);
  };

  const getTableJSX = () => {
    return (
      <div className="table-container-main">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="style-15">
            {data &&
              data.map((element:any, i:any) => {
                return (
                  <tr key={i} onClick={() => setSelectedData(element)}>
                    <td>{element.username}</td>
                    <td>{element.email}</td>
                    <td>
                      <span
                        onClick={() => callUserUpdate(element)}
                        className="icon"
                      >
                        <i className="fas fa-edit icon"></i>
                      </span>
                      <span
                        onClick={() => callOpenDeleteAlert(element)}
                        className="icon"
                      >
                        <i className="fas fa-trash icon" aria-hidden="true"></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  };

  const getDataCenterJSX = () => {
    return (
      <div className="data__section">
        <div className="data__head">
          <h1>Data Center</h1>
        </div>
        <div className="data__details">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU7-B6570-NFXksWl3BPArESJxRo6nc5M26X_9OVnn3dvVfJrGgkw4B-J1Qbh1eoohrI8&usqp=CAU" alt=""/>
          <hr></hr>
          <div className="json__data">
            <span>
              <pre>Username:</pre>&nbsp;
              <pre>{selecteddata ? selecteddata.username : "-"}</pre>
            </span>
            <span>
              <pre>Email:</pre>&nbsp;
              <pre>{selecteddata ? selecteddata.email : "-"}</pre>
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      <h1 className="home__heading">Something new today.....</h1>
      <div className="container">
        <div className="table__section">
          {!openUpdateForm && !openDeleteAlert ?  getTableJSX() : null}
          {openUpdateForm ? <UpdateUser dataToUpdate={dataToUpdate} onCancelClick={()=>{setOpenUpdateForm(!openUpdateForm)}}/> : null}
          {openDeleteAlert ? <CustomAlert className="delete__alert" onCancelClick={()=>{setOpenDeleteAlert(false)}}  onConfirmClick={()=>{deleteUserData()}}/> : null}
        </div>
        <div className="data__view">{getDataCenterJSX()}</div>
      </div>
      <ToastContainer className="toast-container" position="bottom-right" autoClose={5000}/>
    </Wrapper>
  );
};

export default Home;