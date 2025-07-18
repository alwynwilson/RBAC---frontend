import { AppBar, Toolbar, Button, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';


const Header = () => {
const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit"
        onClick={handleLogout}
        >
         <span style={{marginRight:"10px",marginTop:"5px"}}><PersonIcon/></span> Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
