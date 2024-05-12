import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Option,
  Button,
  Alert,
} from "@material-tailwind/react";
import Select from 'react-select';
import { CheckCircleIcon, ClockIcon,PencilSquareIcon,EyeIcon ,TrashIcon,MagnifyingGlassIcon  } from "@heroicons/react/24/solid";
import ProjectData from "@/data/project-data"
import { Link, useNavigate, useParams } from "react-router-dom";
import UsersTableData from "@/data/users-data"
import Loading from "@/layouts/loading";
import SuccessPopup  from "@/layouts/SuccessPopup";
import EditData from "@/api/EditData";

export function EditProject() {
  
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState({
    value:false,
    message:null
  });
  const { authorsTableData, dataLoaded } = UsersTableData();
  const {id}=useParams()  
  const {projectdata,loader}=ProjectData(id);

  const [editprojectdata,setEditprojectdata]=React.useState([])
  const list=authorsTableData.map(user => ({
    value: user.id,  // Use a unique identifier as the value
    label: `${user.firstname} ${user.lastname}`
  }))
  const [iddata,setiddata]=React.useState([])

  const statusoptions=[
    {value:"not started" ,label:"Not Started"},
    {value:"in progress" ,label:"In Progress"},
    {value:"pending" ,label:"Pending"},
    {value:"completed" ,label:"Completed"}
  ]

  React.useEffect(() => {
    if (projectdata && !loader) {
      setEditprojectdata({
        name:projectdata.name,
        category:projectdata.category,
        status:projectdata.status,
        datestart:projectdata.datestart,
        dateend:projectdata.dateend,
        id1:projectdata.users[0].id,
        id2:projectdata.users[1].id,
        id3:projectdata.users[2].id,
        id4:projectdata.users[3].id,
        description:projectdata.description
      })
      console.log(editprojectdata)

      var initlist = list.filter(user => user.id==editprojectdata.id1);
      console.log(initlist)
      setiddata(initlist)
    }    
  }, [projectdata, loader]);

  function handleidchange(selectedOptions){
    if (selectedOptions.length <= 4) {
      setiddata(selectedOptions)
      const selectedIds = selectedOptions.map(option => option.value);
      setEditprojectdata(prevState => ({
        ...prevState,
        id1: selectedIds[0] || '',
        id2: selectedIds[1] || '',
        id3: selectedIds[2] || '',
        id4: selectedIds[3] || ''
      }))
    } 
    console.log(editprojectdata)
   }
   
  const handlechanges=(e)=>{
    const {name,value}=e.currentTarget
      setEditprojectdata({
        ...editprojectdata,
        [name]:value
      })  
      console.log(name)
    console.log(editprojectdata.datestart)

  }

  const handledatechanges=(e)=>{
    const {name,value}=e.currentTarget
    const formattedDate = new Date(value).toLocaleDateString('en-GB');
    setEditprojectdata({
      ...editprojectdata,
      [name]:formattedDate
    })
  }
  const handlestatuschange=(e)=>{
    setEditprojectdata({
      ...editprojectdata,
      status:e.value
    })
    console.log(e)
  }


  const handleeditproject =async()=>{
    try{
      const project=await EditData(editprojectdata,id,'project')
      console.log('project updated successfully:', project)
      setError(null)
      setSuccess({
        value:true,
        message:'Successfully edited project.'
      })
      
    }
    catch(error){
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors);
        setError(errorMessages[0]);
        console.log(errorMessages[0]);
      } else {
        console.error('Failed to update proect:', error);
      }
    }
}

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#DDDDDE ' : 'white',
    color:'gray',
    outline: 'none',
  }),
};

const closepopup=()=>{
    navigate(-1);
}
  if(dataLoaded) return <Loading />
  return (
    <div className="mt-10 mb-8 flex flex-col gap-12">
      <Card>
        <div class="ml-6 mr-6">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <Typography variant="h5" color="blue-gray" className="mb-1">
                Edit Project
              </Typography>
            </div>   
          </CardHeader>

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form className="mx-auto max-w-xl ">
              <div class="grid grid-cols-6 gap-6">
                {error && (
                  <div className="col-span-6 sm:col-full mt-4 mb-4">
                    <Alert variant="ghost" className="bg-red-500 bg-opacity-20 text-red-700">
                      <span>{error}</span>
                    </Alert>
                  </div>
                )}
                {success.value && <SuccessPopup closepopup={closepopup} message={success.message}/>}
                
                <div class="col-span-6 sm:col-span-3">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Name
                  </Typography>
                  <Input
                    name="name"
                    value={editprojectdata.name}
                    onChange={handlechanges}
                    size="sm"
                    placeholder="Project Name"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Category
                  </Typography>
                  <Input
                    name="category"
                    value={editprojectdata.category}
                    onChange={handlechanges}
                    size="sm"
                    placeholder="Project Name"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Status
                  </Typography>
                  <Select
                  name="status"
                  size="md" 
                  placeholder="Choose a status..."
                  styles={customStyles}
                  value={statusoptions.find(option => option.value === editprojectdata.status)}
                  isSearchable={true}
                  onChange={handlestatuschange}
                  options={statusoptions}
                  /> 
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Start Date
                  </Typography>
                  <Input
                    name="datestart"
                    value={editprojectdata.datestart}
                    size="md"
                    type="date"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    End Date
                  </Typography>
                  <Input
                    name="dateend"
                    value={editprojectdata.dateend}
                    onChange={handlechanges}
                    size="md"
                    type="date"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  />
                </div>

              
                </div>
                <div class="col-span-6 sm:col-span-3">
                      <Typography variant="h6" color="blue-gray" className="mb-3 mt-6">
                      Choose  Four Members 
                      </Typography>
                      <Select
                      styles={customStyles}
                      value={list.filter(user => 
                        [editprojectdata.id1, 
                          editprojectdata.id2, 
                          editprojectdata.id3, 
                          editprojectdata.id4]
                        .includes(user.value))}
                      onChange={handleidchange}
                        options={list}
                        isSearchable={true}
                        isMulti={true}
                        placeholder="Search for a member..."
                      />
                </div>

                <Typography variant="h6" color="blue-gray" className="mb-3 mt-6">
                  Description
                </Typography>             
                <Textarea 
                name="description"
                label="Project Description" 
                value={editprojectdata.description}
                onChange={handlechanges}
                /> 

                <div class="col-span-6 sm:col-full ml-4 mt-4 mb-4">
                    <Button 
                      variant="gradient" 
                      color="black"
                      onClick={handleeditproject} >
                      Update Project
                    </Button>   
                </div>

              </form>
            </CardBody>
            </div>
          </Card> 
    </div>
  )
}