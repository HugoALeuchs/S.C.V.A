import React, { useContext } from "react";

// Import the components from the Material-UI library
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

// Import the ColorModeContext from the ColorProvider
import { ColorModeContext } from "../ColorProvider";

// Define the props for the Header component
interface HeaderProps {
  onAddStorage: () => void;
  onRemoveStorage: () => void;
}

// Export the Header component as the default export
export default function Header({ onAddStorage, onRemoveStorage }: HeaderProps) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Display the title based on screen size */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}
          >
            Sistema de Controle de Volume de Armazenamento
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}
          >
            S.C.V.A
          </Typography>
          {/* Toggle theme button */}
          <Tooltip title="Alterar tema" arrow>
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.ColorProvider}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Tooltip>
          {/* Add storage button */}
          <Button
            color="inherit"
            onClick={onAddStorage}
            sx={{ display: { xs: "none", lg: "flex" } }}
          >
            Adicionar Armazem
          </Button>
          {/* Remove storage button */}
          <Button
            color="inherit"
            onClick={onRemoveStorage}
            sx={{ display: { xs: "none", lg: "flex" } }}
          >
            Remover Armazem
          </Button>
          {/* Add storage button for small screens */}
          <Tooltip title="Adicionar Armazem" arrow>
            <IconButton
              sx={{ display: { xs: "flex", lg: "none" } }}
              color="inherit"
              onClick={onAddStorage}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          {/* Remove storage button for small screens */}
          <Tooltip title="Remover Armazem" arrow>
            <IconButton
              sx={{ display: { xs: "flex", lg: "none" } }}
              color="inherit"
              onClick={onRemoveStorage}
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
