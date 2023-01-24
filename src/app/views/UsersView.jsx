import React, { useEffect, useState } from "react";
import {anonymizeUser,findRole,getAll,modifUser,} from "../api/backend/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getAll().then((userdata) => {
      setUsers(userdata.data);
      console.log(userdata);
    });

    setLoader(true);
  }, [reload]);

  useEffect(() => {
    findRole().then((role) => {
      console.log(role);
    });

  },[]);
  if (loader.state == false) {
  if (!loader) {
    return (<div>LOADING...</div>);
  } 
}
  const deleteUser = (id) => {
    anonymizeUser(id).then(res=>{
      console.log(res)
      setReload(prevState => !prevState);
      toast.success("Utilisateur anonymisé", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }).catch(err => {
      toast.error("Erreur dans la suppression d'utilisateur", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    });
  }

  
  const editUser = (_id, index) => {
  const roleSelect = document.getElementById(index).value
  console.log(roleSelect);
    modifUser(_id, {roleSelect}).then( response => {
      console.log(response);
      setReload(prevState => !prevState);
      toast.success("Role Modifié", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }).catch(err => {
      console.log(err);
      toast.error("Erreur dans la modification du rôle", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    });
// setReload(prevState => !prevState);
    console.log("role modifier");
  }

  return (
    <table className="min-w-full border text-center">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-black-900 px-6 py-4 border-r "
          >
            Nom
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
          >
            Email
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 border-r "
          >
            Rôle
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 border-r "
          >
            Supprimer un compte
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 border-r "
          >
            Modifier un Role
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {users.map((user, index) => (
          <>
            {user.role.role === "admin" ? (
              ""
            ) : (
              <tr key={user._id} className="users-list">
                <td className="text-center border-b border-gray-200 ...">
                  {user.firstname + " " + user.lastname}
                </td>
                <td className="text-center border-b border-gray-200 ...">
                  {user.email}
                </td>
                <td className="text-center border-b border-gray-200 ...">
                  {user.role.role}
                </td>
                <td className="align-items: flex-start">
                  <div className="flex justify-center">
                    <button
                    onClick={() => {
                      deleteUser(user._id);
                    }}
                    className="delete-button border-b bg-red-500 rounded-md block w-1/2 p-1.5 "
                    >
                    Supprimer
                    </button>
                  </div>
                  
                </td >
                    <td className=" align-items: flex bg-white ">
                    <select className=" align-items: stretch; block w-2/3 p-1 rounded-md"
                      id = {index}
                    
                    >
                      <option value="client">
                        Client
                      </option>
                      <option value="commercial">
                        Commercial
                      </option>
                    </select>
                    <button className="align-items: bg-blue-50 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-1.5"
                      onClick ={() => {
                        editUser(user._id, index);
                      }}
                    >
                      confirmer
                    </button>
                    </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};



export default UsersView;
