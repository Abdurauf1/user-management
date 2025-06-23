import { ChangeEvent, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Person, PersonSlash, Trash3, BoxArrowRight } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import { ButtonComponent, Checkbox, Loading } from "../components";
import { InitialState } from "../types";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const AdminPage = () => {
  const [data, setData] = useState<InitialState[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<any[]>([]);
  const navigate = useNavigate()

  const loadData = async () => {
    await API
      .get(`/users/`)
      .then(response => {
        setData(response.data);
        setisLoading(false);
      })
      .catch(error => console.log(error));
  };

  const handleSelectAll = () => {
    setIsCheckedAll(!isCheckedAll);
    setIsChecked(data.map((user: InitialState) => user._id));
    if (isCheckedAll) {
      setIsChecked([]);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setIsChecked([...isChecked, id]);
    if (!checked) {
      setIsChecked(isChecked.filter((userId: string) => userId !== id));
    }
    setIsCheckedAll(false);
  };

  const blockUser = () => {
    const activityStatus = "blocked";
    isChecked.map((id: string) => {
      API
        .put(`/users/status/${id}`, {
          activityStatus,
        })
        .then(response => {
          if (response.data.success) {
            toast.error("User blocked successfully", { autoClose: 2500 });
            loadData();
            setIsChecked([]);
            setIsCheckedAll(false)
          }
        })
        .catch(error => console.log(error));
    });
  };

  const unblockUser = () => {
    const activityStatus = "active";
    isChecked.map((id: string) => {
      API
        .put(`/users/status/${id}`, {
          activityStatus,
        })
        .then(response => {
          if (response.data.success) {
            toast.success("User unblocked successfully", { autoClose: 2500 });
            loadData();
            setIsChecked([]);
            setIsCheckedAll(false)
          }
        })
        .catch(error => console.log(error));
    });
  };

  const deleteUser = () => {
    isChecked.map((id: string) => {
      API
        .delete(`/users/delete/${id}`)
        .then(response => {
          if (response.data.success) {
            toast.success("User deleted successfully", { autoClose: 2500 });
            loadData();
            setIsChecked([]);
            setIsCheckedAll(false)
          }
        })
        .catch(error => console.log(error));
    });
  };

  const signOut = () => {
    sessionStorage.clear();
    navigate("/login")
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Container className="my-4">
      <ToastContainer />
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="text-light">Users List</h1>
        <ButtonComponent
          onClick={signOut}
          color="primary"
          icon={<BoxArrowRight />}
          type="Sign Out"
        />
      </div>
      <div className="d-flex gap-2 my-3">
        <ButtonComponent onClick={blockUser} color="warning" icon={<PersonSlash />} type="Block" />
        <ButtonComponent onClick={unblockUser} color="success" icon={<Person />} type="Unblock" />
        <ButtonComponent onClick={deleteUser} color="danger" icon={<Trash3 />} type="Delete" />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <Table striped hover responsive variant="light">
          <thead>
            <tr>
              <th>
                <Checkbox
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  onChange={handleSelectAll}
                  isChecked={isCheckedAll}
                />
              </th>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registration Time</th>
              <th>Last Login Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => {
              const { _id, name, email, reg_time, login_time, activityStatus } = user;
              return (
                <tr key={_id}>
                  <td>
                    <Checkbox
                      key={_id}
                      type="checkbox"
                      name={name}
                      id={_id}
                      onChange={handleSelect}
                      isChecked={isChecked.includes(_id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{reg_time}</td>
                  <td>{login_time}</td>
                  <td>{activityStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminPage;
