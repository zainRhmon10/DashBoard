import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Collapse,
  Box,
  keyframes 
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  People,
  PersonAdd,
  AdminPanelSettings,
  GroupAdd,
  AssignmentInd,
  PlaylistAdd,
  QuestionAnswer,
  ExpandMore,
  ChevronRight,
  PostAdd,
  RestaurantMenu,
  LocalOffer,
  DeliveryDining,

} from "@mui/icons-material";
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';



const SideBar = ({ isOpen }) => {
  const location = useLocation();
  const [openItems, setOpenItems] = useState({});
  const hoverAnimation = keyframes`
    from { transform: translateX(0); }
    to { transform: translateX(5px); }
  `;

  // Your existing menuItems array remains the same
const menuItems = [
    {
      title: "User",
      icon: <People />,
      subItems: [
        { text: "Users", path: "/users", icon: <People /> },
        { text: "Add User", path: "/add-user", icon: <PersonAdd /> }
      ]
    },
    {
      title: "Admin",
      icon: <AdminPanelSettings />,
      subItems: [
        { text: "Admins", path: "/admins", icon: <AdminPanelSettings /> },
        { text: "Add Admin", path: "/add-admin", icon: <GroupAdd /> }
      ]
    },
    {
      title: "Roles",
      icon: <WorkOutlineOutlinedIcon />,
      subItems: [
        { text: "Roles", path: "/roles", icon: <WorkOutlineOutlinedIcon /> },
        { text: "Add Role", path: "/add-role", icon: <ControlPointOutlinedIcon /> }
      ]
    },
    {
      title: "Category",
      icon: <RestaurantMenu />,
      subItems: [
        { text: "Category", path: "/category", icon: <RestaurantMenu /> },
        { text: "Add Category", path: "/add-category", icon: <ControlPointOutlinedIcon /> }
      ]
    },
     {
      title: "Tags",
      icon: <LocalOffer />,
      subItems: [
        { text: "Tags", path: "/tags", icon: <LocalOffer/> },
        { text: "Add Tag", path: "/add-tags", icon: <ControlPointOutlinedIcon /> }
      ]
    },
     {
      title: "Attribute",
      icon: <PostAdd />,
      subItems: [
        { text: "Collection", path: "/attribute", icon: <PostAdd /> },
        { text: "Add Attribute", path: "/add-attribute", icon: <ControlPointOutlinedIcon /> }
      ]
    },
    {
      title: "Delivery Zone",
      icon: <DeliveryDining />,
      subItems: [
        { text: "Zones", path: "/zones", icon: <DeliveryDining /> },
        { text: "Add Zone", path: "/add-zone", icon: <ControlPointOutlinedIcon /> }
      ]
    },
    {
      title: "FAQ",
      icon: <QuestionAnswer />,
      path: "/faq"
    },

    
  ];

  const handleClick = (title) => {
    setOpenItems(prev => ({  [title]: !prev[title] }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? 250 : 0,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: isOpen ? 250 : 0,
          overflowX: 'hidden',
          boxSizing: 'border-box',
          backgroundColor: 'primary.main',
          position: 'fixed',
          top: 16,
          left: 16,
          bottom: 16,
          height: 'auto',
          borderRight: 'none',
          boxShadow: theme => theme.shadows[10],
          borderRadius: '16px',
          transition: 'all 0.3s ease-in-out',
          overflowY: 'auto', 
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0.1)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.4)',
            borderRadius: '3px',
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '8px 0',
        }}
      >
        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const hasSubItems = item.subItems?.length > 0;
            const isOpenSub = openItems[item.title];

            return (
              <div key={item.title}>
                <ListItem 
                  disablePadding 
                  sx={{ 
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    '& .Mui-selected': {
                      backgroundColor: 'rgba(155, 153, 142, 0.07)',
                      '&::before': {
                        width: 4,
                        backgroundColor: 'secondary.dark',
                      },
                       '&:hover': {
                                
                                  '& .MuiListItemIcon-root': {
                                    color:'secondary.dark'
                                  },
                    }}
                  }}
                >
                  <ListItemButton
                    onClick={() => hasSubItems && handleClick(item.title)}
                    component={hasSubItems ? 'div' : Link}
                    to={!hasSubItems ? item.path : undefined}
                    selected={isActive}
                    sx={{
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      borderRadius: '12px',
                      mx: 2,
                      my: 0.5,
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                        transform: 'translateX(8px)',
                                
                                  '& .MuiListItemIcon-root': {
                                    color:'secondary.dark'
                                  },
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        height: '100%',
                        width: 3,
                        backgroundColor: isActive ? 'secondary.dark' : 'transparent',
                        transition: 'all 0.3s ease',
                        borderRadius: '4px 0 0 4px',
                      },
                    }}
                    disableRipple
                  >
                    <ListItemIcon sx={{ minWidth: '40px !important' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.title}
                      sx={{
                        whiteSpace: 'nowrap',
                        '& .MuiTypography-root': {
                          fontWeight: isActive ? 600 : 400,
                        }
                      }}
                    />
                    {hasSubItems && (isOpenSub ? <ExpandMore /> : <ChevronRight />)}
                  </ListItemButton>
                </ListItem>

                {hasSubItems && (
                  <Collapse in={isOpenSub} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => {
                        const isSubActive = location.pathname === subItem.path;
                        
                        return (
                          <ListItem 
                            key={subItem.text} 
                            disablePadding 
                            sx={{ 
                              pl: 4, 
                              opacity: isOpen ? 1 : 0,
                              '& .Mui-selected': {
                                backgroundColor: 'rgba(155, 153, 142, 0.08)',
                                '&::before': {
                                  width: 4,
                                  backgroundColor: 'secondary.dark',
                                },
                                '&:hover': {
                                
                                  '& .MuiListItemIcon-root': {
                                    color:'secondary.dark'
                                  },
                              }
                            }}}
                          >
                            <ListItemButton
                              component={Link}
                              to={subItem.path}
                              selected={isSubActive}
                              sx={{
                                position: 'relative',
                                transition: 'all 0.3s ease',
                                borderRadius: '12px',
                                mx: 2,
                                my: 0.5,
                                '&:hover': {
                                  backgroundColor: 'primary.dark',
                                  transform: 'translateX(8px)',
                                  '& .MuiListItemIcon-root': {
                                    animation: `${hoverAnimation} 0.3s ease forwards`,
                                    color:'secondary.dark'
                                  },
                                },
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  left: 0,
                                  height: '100%',
                                  width: 3,
                                  backgroundColor: isSubActive ? 'secondary.dark' : 'transparent',
                                  transition: 'all 0.3s ease',
                                  borderRadius: '4px 0 0 4px',
                                },
                              }}
                              disableRipple
                            >
                              <ListItemIcon sx={{ minWidth: '40px !important' }}>
                                {subItem.icon}
                              </ListItemIcon>
                              <ListItemText 
                                primary={subItem.text}
                                sx={{
                                  whiteSpace: 'nowrap',
                                  '& .MuiTypography-root': {
                                    fontWeight: isSubActive ? 600 : 400,
                                  }
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </div>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;