import { STATUS_MSG } from "../constants";

export default class TestMe {
    static async testMe(): Promise<String | void> {
        try {
            const throwErr = true;
            if (!throwErr) {
                return 'this is the return messages'
            } else {
                throw new Error()
            }
        }
        catch (err) {
            return Promise.reject(STATUS_MSG.ERROR.BAD_REQUEST)
        }
    }
}