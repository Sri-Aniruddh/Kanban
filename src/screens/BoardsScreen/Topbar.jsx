import {AppBar, Button, Stack, Toolbar,useMediaQuery,IconButton } from "@mui/material"
import ImageEl from "../../components/utils/imageEl";
import logo from "../../assets/logo.png";
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "firebase/auth";
import {auth} from "../../firebase";
import CreateBoardIcon from '@mui/icons-material/AddCircle';

const Topbar = ({openModel}) => {

    const isXs = useMediaQuery(theme=>theme.breakpoints.only('xs')); //mobile view

    return (
        <AppBar position="static" >
            <Toolbar>
                <ImageEl src={logo} alt="logo" sx={{height:50}}/><h3>KANBAN</h3>
                <Stack direction="row" spacing={2} sx={{ flexGrow: 1, justifyContent: "end" }}>

                    {isXs?
                    <>
                        <IconButton color="primary" onClick={openModel}><CreateBoardIcon/></IconButton>
                        <IconButton onClick={()=>{signOut(auth)}}><LogoutIcon/></IconButton>
                    </>:
                    <><Button onClick={openModel} variant="contained">Create Boards</Button>

                    <Button 
                     onClick={()=>{signOut(auth)}}
                     startIcon={<LogoutIcon/>} variant="outlined">Logout
                     </Button></>}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
export default Topbar;