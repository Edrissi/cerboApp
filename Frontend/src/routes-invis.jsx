import {
    HomeIcon,
    UserCircleIcon,
    InformationCircleIcon,
    ServerStackIcon,
    RectangleStackIcon,
    Cog6ToothIcon,
    UsersIcon,
    TableCellsIcon,
    ClipboardDocumentListIcon 
  } from "@heroicons/react/24/solid";
  import { Profile} from "@/pages/dashboard";
  
  import UserProjects from "./pages/dashboard/projects/userprojects";
import MesProjects from "./pages/dashboard/projects/mesprojects";
  import { CreateProject ,ShowProject} from "@/pages/dashboard";
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  export const routesInvis = [
    {
      layout: "invis",
      pages: [
        {
          icon: <TableCellsIcon  {...icon} />,
          name: "Mes projets",
          path: "/myprojects",
          element: <MesProjects />,
        },
        // {
        //   icon: <ClipboardDocumentListIcon  {...icon} />,
        //   name: "tasks",
        //   path: "/tasks",
        //   element: <UserTasks />,
        // },
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
          path: "/project/show/:id",
          element: <ShowProject />,
        },
        
      ],
    },
    
    
    
  ];
  
  export default routesInvis;
  