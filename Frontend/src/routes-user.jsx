import {
    HomeIcon,
    UserCircleIcon,
    InformationCircleIcon,
    ServerStackIcon,
    RectangleStackIcon,
    Cog6ToothIcon,
    UsersIcon,
    TableCellsIcon,
    ClipboardDocumentListIcon, 
    UserGroupIcon
  } from "@heroicons/react/24/solid";
  import { Profile, Reunions} from "@/pages/dashboard";
 
  import UserProjects from "./pages/dashboard/projects/userprojects";
  import { ProjectTable ,CreateProject,EditProject,ShowProject} from "@/pages/dashboard";
  import { ShowMesProject } from "@/pages/dashboard";
  import MesProjects from "./pages/dashboard/projects/mesprojects";
import { ShowReunion } from "./pages/dashboard/reunions/showReunion";
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  export const routesUser = [
    {
      layout: "user",
      pages: [
        {
          icon: <UserGroupIcon {...icon} />,
          name: "reunions",
          path: "/reunions",
          element: <Reunions />,
        },
        {
          icon: <TableCellsIcon  {...icon} />,
          name: "projets",
          path: "/projects",
          element:<ProjectTable />,
        },
        {
          icon: <TableCellsIcon  {...icon} />,
          name: "Mes projets",
          path: "/myprojects",
          element: <MesProjects />,
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
          path: "/reunion/show/:id",
          element: <ShowReunion />,
        },
        {
          path: "/project/showMes/:id",
          element: <ShowMesProject />,
        },
        
      ],
    },
    
    
    
  ];
  
  export default routesUser;
  