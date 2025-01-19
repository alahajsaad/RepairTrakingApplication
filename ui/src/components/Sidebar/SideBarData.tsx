import { FaBook } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

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
