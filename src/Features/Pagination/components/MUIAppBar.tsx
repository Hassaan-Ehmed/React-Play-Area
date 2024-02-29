import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import { alpha, styled } from "@mui/material/styles";
import ClearIcon from '@mui/icons-material/Clear';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar({ setInput, input, handleFilertOut ,clearInput}: any) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Search sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <StyledInputBase
              value={input}
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              onChange={(e: any) => setInput(e.target.value)}
              />
             {input !== "" && <ClearIcon sx={{cursor:"pointer",fontSize:'1.5vw',marginRight:"8px"}} 
             
             onClick={clearInput}/>} 
          </Search>

          <Button
            variant="contained"
            sx={{ backgroundColoe: "white" }}
            onClick={handleFilertOut}
          >
            <SearchIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
