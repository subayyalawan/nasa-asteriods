import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.nasa.gov/neo/rest/v1/feed?"
})

export const get = (url, params)=> instance.get(url, {params})