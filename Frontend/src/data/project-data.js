import axios from "axios";
import Cookies from "js-cookie";
import React from "react";

const ProjectData=(id)=>{
        const [project,setProject]=React.useState({
            data:[],
            loader:true
        });
        React.useEffect(()=>{
            const getprojectdata=async(id)=>{
                try{
                    const jwtcookie=Cookies.get('jwt');
                    if(jwtcookie){
                        const response=await axios.get(`http://localhost:8000/invis/projet/${id}`, {
                            headers: {
                              Authorization: `Bearer ${jwtcookie}`,
                            },
                          });
                        setProject({
                            data:response.data,
                          
                            loader:false
                        });
                    }
                }catch(error){
                    console.error('Error checking project '+{id}+' data : ', error);
                    throw error
                }
            }
            getprojectdata(id);
        },[id])
        return ({projectdata:project.data, loader : project.loader});
}

export default ProjectData;
