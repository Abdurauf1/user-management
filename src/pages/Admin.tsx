import { ChangeEvent, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { api } from "../api/api";
import { Person, PersonSlash, Trash3, BoxArrowRight } from "react-bootstrap-icons";
import { ToastContainer } from "react-toastify";
import { ButtonComponent, Checkbox, Loading } from "../components";
import { InitialState } from "../types";
import axios from "axios";

const AdminPage = () => {
  const [data, setData] = useState<InitialState[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<string[]>([]);

  const loadData = async () => {
    await axios
      .get(`${api}/users/`)
      .then(response => {
        setData(response.data);
        setisLoading(false);
      })
      .catch(error => console.log(error));
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (checked) {
      setSelected((prevId: string[]) => [...prevId, id]);
    } else {
      setSelected((prevId: string[]) => {
        return [...prevId.filter(id => id !== id)];
      });
    }
  };

  const blockUser = () => {
    // const status = "blocked";
    // checked.map(id => {
    //   axios
    //     .put(`${api}/users/status/${id}`, {
    //       status,
    //     })
    //     .then(() => {
    //       toast.error("User blocked successfully", { autoClose: 2500 });
    //     })
    //     .catch(error => console.log(error));
    // });
    // loadData();
  };

  const unblockUser = () => {
    // const status = "active";
    // checked.map(id => {
    //   axios
    //     .put(`${api}/users/status/${id}`, {
    //       status,
    //     })
    //     .then(() => {
    //       toast.success("User unblocked successfully", { autoClose: 2500 });
    //     })
    //     .catch(error => console.log(error));
    // });
    // loadData();
  };

  const deleteUser = () => {
    // checked.map(id => {
    //   axios
    //     .delete(`${api}/users/delete/${id}`)
    //     .then(() => {
    //       toast.success("User deleted successfully", { autoClose: 2500 });
    //       sessionStorage.clear();
    //     })
    //     .catch(error => console.log(error));
    // });
    // loadData();
    console.log(selected);
  };

  const signOut = () => {
    sessionStorage.clear();
    location.reload();
  };

  useEffect(() => {
    loadData();
  }, []);

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
                <Checkbox onChange={handleCheckbox} />
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
                <tr key={index}>
                  <td>
                    <Checkbox id={_id} onChange={handleCheckbox} />
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
