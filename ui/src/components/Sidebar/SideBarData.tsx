import { FaHome } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { FaBook } from "react-icons/fa";

export const SidebarData = [
    {
      title: "Ajouter réparation",
      path: "/reparation",
      icon: IoMdAdd, // Pass the component itself
      cName: "nav-text",
    },
    {
      title: "Historique de reparation",
      path: "/reparationFilter",
      icon: FaBook, // Pass the component itself
      cName: "nav-text",
    },
   
    
];
