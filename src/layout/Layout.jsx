import { CssBaseline, Box } from "@mui/material";
import TopBar from "../components/global/TopBar";
import SideBar from "../components/global/SideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (  
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideBar isOpen={isOpen} />
      
      
      
      {/*for topbar and other */}
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${isOpen ? 250 : 0}px)`,
          minHeight: '100vh',
          backgroundColor: 'background.default',
          transition: 'width 0.3s ease',
        }}
      >
        <TopBar toggleDrawer={toggleDrawer} isOpen={isOpen} />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;