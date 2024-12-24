import dotenv from "dotenv";
import {app} from "./app.js";


dotenv.config({
    path:'./.env'
})


try {
    
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is listening at port ${process.env.PORT}`);
    })
} catch (error) {
    console.log(`Server is unable to connect ${error}`)
}