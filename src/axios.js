import axios from "axios";

const instance = axios.create({
    baseURL: "https://messagio-app.herokuapp.com"
});

export default instance;