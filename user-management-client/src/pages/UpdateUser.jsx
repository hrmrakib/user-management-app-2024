import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const loaderUser = useLoaderData();
  const [user, setUser] = useState(loaderUser);
  const [gender, setGender] = useState(loaderUser.gender);
  const [status, setStatus] = useState(loaderUser.status);

  const handleGender = (val = gender) => {
    setGender(val);
  };

  const handleStatus = (val = status) => {
    setStatus(val);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = { name, email, gender, status };

    console.log(user);

    fetch(`http://localhost:2468/users/${loaderUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          alert("Updated Successfully!!!");
          navigate("/");
        }
      });
  };

  return (
    <div>
      <div>
        <Link to='/'>
          <button className='btn btn-outline mb-4'>All Users</button>
        </Link>
      </div>
      <h2 className='text-orange-600 text-bold text-2xl font-bold'>
        Update Your Profile
      </h2>
      <form onSubmit={handleUpdate}>
        <label className='flex flex-col gap-3'>
          <span>Your Name</span>
          <input
            type='text'
            defaultValue={user.name}
            name='name'
            className='input input-bordered input-success w-full max-w-xs'
          />
        </label>

        <label className='flex flex-col gap-3'>
          <span>Your Email</span>
          <input
            type='text'
            defaultValue={user.email}
            name='email'
            className='input input-bordered input-success w-full max-w-xs'
          />
        </label>

        <fieldset data-role='controlgroup' className='flex items-center gap-5'>
          <span className='label-text'>Remember me</span>

          <label
            className='cursor-pointer label'
            onClick={() => handleGender("Male")}
          >
            <input
              type='radio'
              name='gender'
              defaultChecked={gender === "Male" ? true : false}
              className='checkbox checkbox-accent'
            />
            Male
          </label>

          <label
            className='cursor-pointer label'
            onClick={() => handleGender("Female")}
          >
            <input
              type='radio'
              name='gender'
              defaultChecked={gender === "Female" ? true : false}
              className='checkbox checkbox-accent'
            />
            Female
          </label>
        </fieldset>

        <fieldset data-role='controlgroup' className='flex items-center gap-5'>
          <span className='label-text'>Status</span>

          <label
            className='cursor-pointer label'
            onClick={() => handleStatus("Active")}
          >
            <input
              type='radio'
              name='status'
              defaultChecked={status === "Active" ? true : false}
              className='checkbox checkbox-accent'
            />
            Active
          </label>

          <label
            className='cursor-pointer label'
            onClick={() => handleStatus("Inactive")}
          >
            <input
              type='radio'
              name='status'
              defaultChecked={status === "Inactive" ? true : false}
              className='checkbox checkbox-accent'
            />
            Inactive
          </label>
        </fieldset>

        <input className='btn btn-primary' type='submit' value='Add User' />
      </form>
    </div>
  );
};
