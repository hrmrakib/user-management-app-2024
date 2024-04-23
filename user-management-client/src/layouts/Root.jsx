import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className='w-[80%] mx-auto mt-12'>
      <Outlet />
    </div>
  );
};

export default Root;
