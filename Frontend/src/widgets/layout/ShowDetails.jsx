import React from 'react'
import {
  Typography,
} from "@material-tailwind/react";

export function ShowDetails({title , data , className}){
    return(
      <div className={className}>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <div className='flex'>
            
            {data}
          
        </div>
      </div>
    );
  }
