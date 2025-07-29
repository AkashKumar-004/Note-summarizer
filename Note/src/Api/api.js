import axios from "axios";
const API = import.meta.env.VITE_API;

const getNotes=()=>axios.get(`${API}/notes/`)
const addNotes=({title,content})=>axios.post(`${API}/notes/add`,{title,content});
const summ=async (id)=>axios.post(`${API}/notes/summary/${id}`);
const contentsum=(title)=>axios.post(`${API}/notes/content`,title).then(res=>res.data.content);
const deletebyid = async (id)=>axios.delete(`${API}/notes/delete/${id}`);
export {getNotes,addNotes,summ,contentsum,deletebyid};