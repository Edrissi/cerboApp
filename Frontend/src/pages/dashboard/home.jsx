import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Input,
  Chip,
  Button
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsChartsData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon,PencilSquareIcon,EyeIcon ,TrashIcon,MagnifyingGlassIcon,Cog6ToothIcon, UsersIcon, UserGroupIcon  } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import AuthorsTableData from "@/data/authors-table-data";
import ProjectsTabledata from "@/data/projects-table-data";
import Loading from "@/layouts/loading";

export function Home() {
  const {projects , loader}= ProjectsTabledata()
  const { totalUsers } = AuthorsTableData();
  const [filter,setfilter]=React.useState('');
  
  const CompletedProjectstotal=projects.filter(project=>project.status==="completed").length;
  const InProgressProjects=projects.filter(project=>project.status==="in progress").length;
  const TotalUsers=totalUsers;
  const Totalgrps=projects.length;
  const CompletedProjects=projects.filter(project=>project.status==="completed")

  var projectsdatanew=CompletedProjects.filter(project=>project.name.toLowerCase().startsWith(filter.toLowerCase()))

  const statisticsCardsData = [
    {
      icon: UsersIcon,
      title: "Total Users",
      value: TotalUsers,
    },
    {
      icon: CheckCircleIcon,
      title: "Completed Projects",
      value:CompletedProjectstotal ,
    },
    {
      icon: ClockIcon,
      title: "In Progress Projects",
      value: InProgressProjects,
    },
    {
      icon: UserGroupIcon,
      title: "Total Groups",
      value: Totalgrps,
    },
  ];
  
  if(loader) return <Loading />
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title} 
            color="gray"
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
          />
        ))}
      </div>

      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <Typography variant="h5" color="blue-gray" className="mb-1">
                Completed Projects
              </Typography>
            </div>
            <div className="flex items-center justify-between mr-5 gap-4">
              <Input 
                  label="Search By Name" 
                  value={filter}
                  onChange={e=>setfilter(e.target.value)}
                      />
              <Link to=".">
                  <IconButton variant="gradient" color="black">
                    <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                  </IconButton>
              </Link>
            </div>
          </CardHeader>
         
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Projects", "Members", "Date Start" , "Date End" , "Status" , "show"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsdatanew
                .map(
                  ({id ,name , datestart , dateend ,status,users }) => {
                    const className = `py-4 px-5`;
                    const reversedstartDate = datestart.split("-").reverse().join("-");
                    const reversedendDate = dateend.split("-").reverse().join("-");

                    return (
                      <tr>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>

                        <td className="py-4 px-5">
                          {users
                                .map(({ id,img, firstname,lastname }, key) => (
                                  <Tooltip key={id} content={`${firstname} ${lastname}`}>
                                    <Avatar
                                      key={id}
                                      src={img}
                                      alt={`${firstname} ${lastname}`}
                                      size="xs"
                                      variant="circular"
                                      className={`cursor-pointer border-2 border-white ${
                                        "-ml-2.5"
                                      }`}
                                    />
                                  </Tooltip>
                            ))}
                        </td>
                                          
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {reversedstartDate} 
                          </Typography>
                        </td>
                  
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {reversedendDate} 
                          </Typography>
                        </td>

                        <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status=="completed" ?  "green" : "blue-gray"}
                          value={status}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      
                      <td className={className}>
                      <Link to={`../project/show/${id}`}>
                            <IconButton variant="text" color="blue-gray">
                            <EyeIcon className="h-5 w-5 text-black" />
                            </IconButton>
                      </Link>
                    </td>
                        
                      </tr>
                      
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        
      </div>

      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>

    </div>
  );
}

export default Home;
