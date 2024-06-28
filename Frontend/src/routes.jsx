import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  UsersIcon,
  
  ClipboardDocumentListIcon 
} from "@heroicons/react/24/solid";
import { Home,ExaminProject,Profile, UserTable , ProjectTable ,  CreateProject, EditProject ,ShowMesProject, 

  ShowProject , CreateUser , ShowUser
  } from "@/pages/dashboard";
import MesProjects from "./pages/dashboard/projects/mesprojects";
import ExaminProjectRapport from "./pages/dashboard/projects/examinprojectrapport";
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
        name: "projets",
        path: "/projects",
        element: <ProjectTable />,
      },
     
      {
        icon: <TableCellsIcon  {...icon} />,
        name: "Mes projets",
        path: "/myprojects",
        element: <MesProjects />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Membres",
        path: "/users",
        element: <UserTable userOrInvis={"users"}/>,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Investigateurs",
        path: "/invist",
        element: <UserTable userOrInvis={"invis" }/>,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      // {
      //   path: "/project/examin/:id",
      //   element: <ExaminProject />,
      // },
      // {
      //   path: "/project/rapport/:id",
      //   element: <ExaminProjectRapport />,
      // },
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
        path: "/project/showMes/:id",
        element: <ShowMesProject />,
      },
      {
        path: "/user/create",
        element: <CreateUser />,
      },
      {
        path: "/user/show/:id",
        element: <ShowUser />,
      },
      {
        path: "/user/delete/:id",
        element: <ShowUser />,
      },
    ],
  },  
];



export default routes;
