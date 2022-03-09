import axios from 'axios';

const { IP_SERVER } = process.env;

export const api = axios.create({
  baseURL: `http://${IP_SERVER}:3333`,
})