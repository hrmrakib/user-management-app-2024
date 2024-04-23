import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import AllUsers from "../pages/AllUsers";
import { AddUser } from "../pages/AddUser";
import { UpdateUser } from "../pages/UpdateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <AllUsers />,
        loader: () => fetch("http://localhost:2468/users"),
      },
      {
        path: "/add-user",
        element: <AddUser />,
      },
      {
        path: "/update-user/:id",
        element: <UpdateUser />,
        loader: ({ params }) =>
          fetch(`http://localhost:2468/users/${params.id}`),
      },
    ],
  },
]);

export default router;
