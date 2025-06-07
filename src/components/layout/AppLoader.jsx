import { Stack,CircularProgress } from "@mui/material" 
const AppLoader=()=> {
    

    return (
       <Stack alignItems={'center'} sx={{mt:10}} >
            <CircularProgress sx={{mt:10}}/>
            
       </Stack>
    )
}

export default AppLoader