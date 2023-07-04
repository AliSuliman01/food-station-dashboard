import { NavLink } from "react-router-dom";

export default function({content, to}){
    return <NavLink to={to} className="mx-4 my-2 font-semibold text-gray-500">{content}</NavLink>;
}