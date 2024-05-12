import React from 'react';
import { Tooltip, Avatar, Typography, Button ,Checkbox , IconButton} from '@material-tailwind/react';


export default function EndTasks() {
    return (
        <div class="bg-white p-6 rounded-2xl shadow shadow-slate-300 relative">
            <div class="flex flex-row justify-between items-center">
                <div className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 mt-4">
                    <div class="flex items-center w-40 justify-center rounded-md py-2 px-2 bg-gradient-to-br from-pink-600 to-pink-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hourglass-split h-5 w-5 text-white" viewBox="0 0 16 16">
                        <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
                    </svg>
                    <h4 class="ml-2 text-md font-bold text-white dark:text-white uppercase">About to End</h4>

                    </div>
                    
                </div>
               
            </div>
           
            <div
            id="tasks"
            style={{
                maxHeight: "355px",
                overflow: "hidden",
            }}
            >
            <div
                style={{
                maxHeight: "351px",
                overflowY: "auto",
                marginRight: "-17px",
                paddingRight: "17px",
                }}
            >          
                <div id="task" class="flex-col justify-between items-center py-3 px-2 border-b border-slate-200 border-l-4  border-l-transparent mt-3">
                    <div class="flex items-start justify-start space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                            </svg>
                                                    
                        <Typography variant="small" className="font-normal text-dark mb-1">
                        Mar 14, 2019
                        </Typography>              
                        
                    </div>
                    <Typography variant="small" className="font-normal text-gray-600">
                        Creating dynamic website
                    </Typography>
                </div>
                    
                <div id="task" class="flex-col justify-between items-center py-3 px-2 border-b border-slate-200 border-l-4  border-l-transparent">
                    <div class="flex items-start justify-start space-x-2">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                            </svg>
                                                    
                        </div>
                        <Typography variant="small" className="font-normal text-dark mb-1">
                        Mar 14, 2019
                        </Typography>              
                        
                    </div>
                    <Typography variant="small" className="font-normal text-gray-600">
                        Creating dynamic website
                    </Typography>
                </div>

                <div id="task" class="flex-col justify-between items-center py-3 px-2 border-b border-slate-200 border-l-4  border-l-transparent">
                    <div class="flex items-start justify-start space-x-2">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                            </svg>
                                                    
                        </div>
                        <Typography variant="small" className="font-normal text-dark mb-1">
                        Mar 14, 2019
                        </Typography>              
                        
                    </div>
                    <Typography variant="small" className="font-normal text-gray-600">
                        Creating dynamic website
                    </Typography>
                </div>

                <div id="task" class="flex-col justify-between items-center py-3 px-2 border-b border-slate-200 border-l-4  border-l-transparent">
                    <div class="flex items-start justify-start space-x-2">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                            </svg>
                                                    
                        </div>
                        <Typography variant="small" className="font-normal text-dark mb-1">
                        Mar 14, 2019
                        </Typography>              
                        
                    </div>
                    <Typography variant="small" className="font-normal text-gray-600">
                        Creating dynamic website
                    </Typography>
                </div>

                <div id="task" class="flex-col justify-between items-center py-3 px-2 border-b border-slate-200 border-l-4  border-l-transparent">
                    <div class="flex items-start justify-start space-x-2">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                            </svg>
                                                    
                        </div>
                        <Typography variant="small" className="font-normal text-dark mb-1">
                        Mar 14, 2019
                        </Typography>              
                        
                    </div>
                    <Typography variant="small" className="font-normal text-gray-600">
                        Creating dynamic website
                    </Typography>
                </div>

                <div id="task" class="flex-col justify-between items-center py-3 px-2 border-b border-slate-200 border-l-4  border-l-transparent">
                    <div class="flex items-start justify-start space-x-2">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                            </svg>
                                                    
                        </div>
                        <Typography variant="small" className="font-normal text-dark mb-1">
                        Mar 14, 2019
                        </Typography>              
                        
                    </div>
                    <Typography variant="small" className="font-normal text-gray-600">
                        Creating dynamic website
                    </Typography>
                </div>
                
            </div>
            
        </div>
     </div>
      )
}
