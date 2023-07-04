import { NavLink } from "react-router-dom";

export default function({text, to}){
    return <NavLink to={to} className="text-sm font-semibold text-gray-500 px-4 sm:px-2 py-1 rounded-lg mx-1">{text}</NavLink>

}