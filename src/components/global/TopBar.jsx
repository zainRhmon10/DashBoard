import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { colorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const TopBar = ({ toggleDrawer, isOpen }) => {
  const theme = useTheme();
  const colorMode = useContext(colorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      px={4}
      sx={{
        backgroundColor: "primary.main",
        boxShadow: (theme) => theme.shadows[10],
        borderRadius: "16px",
      }}
    >
      {/* sidebar button*/}
      <Box><IconButton
        onClick={toggleDrawer}
        
        sx={{
          display: { xs: 'inline-flex' },
          mr: 2,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton></Box>

      {/* icons box */}
      <Box display="flex" gap={1}>
        <IconButton
          onClick={colorMode.toggleColorMode}
          sx={{
            "&:hover": { transform: "rotate(180deg)", transition: "0.3s" },
          }}
        >
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />

          ) : (
            <DarkModeOutlinedIcon />

          )}
        </IconButton>
        <IconButton
          sx={{
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <NotificationsNoneOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <SettingsOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
