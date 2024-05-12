import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  UsersIcon,
  ClipboardDocumentListIcon 
} from "@heroicons/react/24/solid";
import { Home, Profile, UserTable , ProjectTable , TaskTable, CreateProject, EditProject , 

  ShowProject , CreateTask , EditTask , ShowTask , CreateUser , ShowUser
  } from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "projects",
        path: "/projects",
        element: <ProjectTable />,
      },
      {
        icon: <ClipboardDocumentListIcon  {...icon} />,
        name: "tasks",
        path: "/tasks",
        element: <TaskTable />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Membres",
        path: "/users",
        element: <UserTable userOrInvis={"users"}/>,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Invistigateurs",
        path: "/invist",
        element: <UserTable userOrInvis={"invis" }/>,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/project/create",
        element: <CreateProject />,
      },
      {
        path: "/project/edit/:id",
        element: <EditProject />,
      },
      {
        path: "/project/show/:id",
        element: <ShowProject />,
      },

      {
        path: "/task/create",
        element: <CreateTask />,
      },
      {
        path: "/task/edit",
        element: <EditTask />,
      },
      {
        path: "/task/show/:id",
        element: <ShowTask />,
      },
      {
        path: "/user/create",
        element: <CreateUser />,
      },
      {
        path: "/user/show/:id",
        element: <ShowUser />,
      },
    ],
  },
  
  
  
];

export default routes;
