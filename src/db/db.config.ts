import { CONFIG } from "../constants";
import mongoose from "mongoose";

const connection =async () => {
    return mongoose.connect(CONFIG.DB_URL)
    .then(() => {
        console.log('database connection established');
        
    })
    .catch((err: Error) => {
        console.log(err);  
    })
}

export default connection;