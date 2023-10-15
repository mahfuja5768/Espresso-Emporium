import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://coffee-store-server-f074xxx5n-mahfuja5768.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://coffee-store-server-f074xxx5n-mahfuja5768.vercel.app/users/${_id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              console.log(data);
              const remainingUsers = users.filter((user) => user._id !== _id);
              setUsers(remainingUsers);
            }
          });
      }
    });
  };

  return (
    <div className="max-w-[1280px] mx-auto my-12">
      <h3 className="text-3xl">All Users: {users.length}</h3>
      <div>
        <div className="overflow-x-auto my-6">
          <table className="table">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th></th>
                <th className="text-xl">Profile</th>
                <th className="text-xl">Name</th>
                <th className="text-xl">Email</th>
                <th className="text-xl">Create Time</th>
                <th className="text-xl">Last login</th>
                <th className="text-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <th className="text-xl">1</th>
                  <td className="text-xl">
                    <img
                      src={user.photo}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="text-xl">{user.name}</td>
                  <td className="text-xl">{user.email}</td>
                  <td className="text-xl">{user.creationTime}</td>
                  <td className="text-xl">{user.lastLoggedAt}</td>
                  <td className="text-xl">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
