import { useState } from "react";
import "./Sidebar.css";
import SideBarItem from './SideBarItem';
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { SidebarData } from "./SideBarData";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Toggle function to update the state
  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className={isOpen ? 'SideBar' : 'SideBarClosed'}>
      <div className='flex items-center justify-between p-2 m-2'>
        {isOpen && (
          <div>
            <p>logo</p>
          </div>
        )}
       
        {isOpen ? (
          <LuPanelLeftClose onClick={toggleSidebar} className="text-2xl cursor-pointer" />
        ) : (
          <LuPanelLeftOpen onClick={toggleSidebar} className="text-2xl cursor-pointer" />
        )}
      </div>
      <div>
        {SidebarData.map((item, index) => (
          <SideBarItem 
            key={index}
            Icon={item.icon} 
            path={item.path} 
            libelle={isOpen ? item.title : ''} 
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
