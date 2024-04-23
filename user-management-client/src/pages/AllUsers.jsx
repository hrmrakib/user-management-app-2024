import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";

const AllUsers = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDelete = (id) => {
    fetch(`http://localhost:2468/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    const filtered = users.filter((user) => user._id !== id);
    setUsers(filtered);
  };

  return (
    <div>
      <Link to='/add-user'>
        <button className='btn btn-outline mb-4'>Add a New</button>
      </Link>

      <div className='overflow-x-auto'>
        <table className='table table-xs'>
          <thead>
            <tr className='*:text-xl'>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* tbody */}
          <tbody>
            {users.map((user, i) => (
              <tr className='*:text-lg' key={user._id}>
                <th>{i + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.gender}</td>
                <td>{user?.status}</td>

                <div className='flex items-center gap-8'>
                  <Link to={`/update-user/${user._id}`}>
                    <button>
                      <FaEdit className='text-3xl' />
                    </button>
                  </Link>

                  <button onClick={() => handleDelete(user._id)}>
                    <MdDelete className='text-3xl' />
                  </button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
