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
  import { Profile, EditTask , ShowTask} from "@/pages/dashboard";
  import UserTasks from "./pages/dashboard/tasks/usertasks";
  import UserProjects from "./pages/dashboard/projects/userprojects";
  
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  export const routesUser = [
    {
      layout: "user",
      pages: [
        {
          icon: <TableCellsIcon  {...icon} />,
          name: "projects",
          path: "/projects",
          element: <UserProjects />,
        },
        {
          icon: <ClipboardDocumentListIcon  {...icon} />,
          name: "tasks",
          path: "/tasks",
          element: <UserTasks />,
        },
        {
          icon: <UserCircleIcon {...icon} />,
          name: "profile",
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/tasks/edit",
          element: <EditTask />,
        },
        {
          path: "/tasks/show",
          element: <ShowTask />,
        },
      ],
    },
    
    
    
  ];
  
  export default routesUser;
  