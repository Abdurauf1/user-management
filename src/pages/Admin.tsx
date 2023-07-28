import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { api } from "../api/api";
import { Person, PersonSlash, Trash3, BoxArrowRight } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ButtonComponent from "../components/ButtonComponent";
import Checkbox from "../components/Checkbox";

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [_checkAll, _setCheckAll] = useState<boolean>(false);

  const loadData = async () => {
    const res = await axios.get(`${api}/users/`);
    setData(res.data);
  };

  const select = (e: any) => {
    const { id, checked } = e.target;
    if (checked) {
      setChecked(pre => [...pre, id]);
    } else {
      setChecked(pre => {
        return [...pre.filter(id => id !== id)];
      });
    }
  };

  const selectAll = (_e: any) => {};

  const blockUser = () => {
    const status = "blocked";
    checked.map(id => {
      axios
        .put(`${api}/users/status/${id}`, {
          status,
        })
        .then(() => {
          toast.error("User blocked successfully", { autoClose: 2500 });
        })
        .catch(error => console.log(error));
    });
    loadData();
  };

  const unblockUser = () => {
    const status = "active";
    checked.map(id => {
      axios
        .put(`${api}/users/status/${id}`, {
          status,
        })
        .then(() => {
          toast.success("User unblocked successfully", { autoClose: 2500 });
        })
        .catch(error => console.log(error));
    });
    loadData();
  };

  const deleteUser = () => {
    checked.map(id => {
      axios
        .delete(`${api}/users/delete/${id}`)
        .then(() => {
          toast.success("User deleted successfully", { autoClose: 2500 });
          sessionStorage.clear();
        })
        .catch(error => console.log(error));
    });
    loadData();
  };

  const signOut = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    loadData();
    console.log(data);
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
      <Table striped hover responsive variant="light">
        <thead>
          <tr>
            <th>
              <Checkbox onClick={() => selectAll} />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Registration Time</th>
            <th>Last Login Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data)
            ? data.map(user => {
                const { id, name, email, reg_time, login_time, status } = user;
                return (
                  <tr key={id}>
                    <td>
                      <Checkbox onClick={() => select} id={id} />
                    </td>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{reg_time}</td>
                    <td>{login_time}</td>
                    <td>{status}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPage;
