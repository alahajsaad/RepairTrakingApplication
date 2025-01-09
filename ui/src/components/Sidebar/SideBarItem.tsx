import { Link } from 'react-router-dom';
import { IconType } from "react-icons";

interface MyProps {
  path?: string;
  libelle?: string;
  Icon?: IconType; 
}

const SideBarItem = ({ path = "#", libelle = "", Icon }: MyProps) => {
  return (
    <Link
      to={path} 
      className="p-4 m-2 rounded-[5px] text-black flex items-center space-x-2 hover:bg-indigo-400 transition-colors"
    >
      {Icon && <Icon />}
      {libelle && <p>{libelle}</p>}
    </Link>
  );
}

export default SideBarItem;
