import cors from 'cors';

const ACCEPTED_ORIGINS=[
  "http://localhost:5173"
]

export const corsMiddleware =({accepted_origins = ACCEPTED_ORIGINS} = {})=>{
  return cors({
    origin:(origin,callback)=>{
      if(!origin){
        return callback(null,true)
      }

      if(ACCEPTED_ORIGINS.includes(origin)){
        return callback(null,true)
      }
      return callback(new Error("origin no accepted"));
    },
    methods:['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
  })
}

