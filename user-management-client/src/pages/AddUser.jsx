import { useState } from "react";
import { Link } from "react-router-dom";

export const AddUser = () => {
  const [gender, setGender] = useState("Male");
  const [status, setStatus] = useState("Active");

  const handleGender = (val) => {
    setGender(val);
  };
  const handleStatus = (val) => {
    setStatus(val);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = { name, email, gender, status };

    console.log(user);
    fetch("http://localhost:2468/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          form.reset();
        }
      });
  };

  return (
    <div>
      <Link to='/'>
        <button className='btn btn-outline mb-4'>All Users</button>
      </Link>
      <form onSubmit={handleAddUser}>
        <label className='flex flex-col gap-3'>
          <span>Your Name</span>
          <input
            type='text'
            placeholder='Enter Name'
            name='name'
            className='input input-bordered input-success w-full max-w-xs'
          />
        </label>

        <label className='flex flex-col gap-3'>
          <span>Your Email</span>
          <input
            type='text'
            placeholder='Enter Email'
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
