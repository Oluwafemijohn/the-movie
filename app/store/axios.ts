import axios from "axios"
import { TOKEN } from "./Constants";
axios.defaults.baseURL = 'http://localhost:1010/'
axios.defaults.headers.common = {'Authorization': `bearer ${TOKEN}`}
export default axios;
