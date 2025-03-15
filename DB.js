import mongoose from "mongoose";

export default async function connectDB(){
    try{
        await mongoose.connect(
          "mongodb+srv://teddiazdiaz019:tfO1D9GL1t0IzvCP@clustertasks.w1omw.mongodb.net/?retryWrites=true&w=majority&appName=clusterTasks"
        );
        console.log(">> DB");
    }catch(error){
        console.log("No se logro conectar ala base de datos");
    }
}

