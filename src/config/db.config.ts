import { CONFIG } from "../constants";
import mongoose, {connect} from "mongoose";

const connection =async () => {
    return connect(<string>CONFIG.DB_URL)
    .then(() => {
        console.log('database connection established');
        
    })
    .catch((err: Error) => {
        console.log(err);  
    })
}

export default connection;