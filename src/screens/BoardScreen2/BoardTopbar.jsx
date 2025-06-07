import { memo } from "react";
import {AppBar, IconButton, Stack, Toolbar,Typography,useMediaQuery } from "@mui/material"
import BackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import {colors} from '../../theme'


const BoardTopbar=({name,lastUpdated,color ,deleteBoard})=> {
    const navigate=useNavigate();
    const isXs = useMediaQuery(theme=>theme.breakpoints.only('xs')); //mobile view

    return (
        <AppBar
        position="static"
        sx={{
            borderBottom: '5px solid ',
            borderColor: colors[color],
        }}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Stack spacing={1} alignItems="center" direction="row" >
                    <IconButton varient="h6" size="small" onClick={()=>navigate(`/boards`)}>
                        <BackIcon />
                    </IconButton>
                    <Typography  variant="h5">
                        {name}
                    </Typography>
                </Stack>

                <Stack spacing={2} alignItems="center" direction="row" >
                    
                    <Typography display={{xs:'none',sm:'block'}} variant="subtitle1" >
                        Last updated: {lastUpdated}
                    </Typography>
                    <IconButton varient="h6" onClick={deleteBoard}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </Toolbar>
                
        </AppBar>
    )
}
export default memo(BoardTopbar);