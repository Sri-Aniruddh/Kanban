
import { Stack, Typography, Grid, IconButton, Box } from '@mui/material';
import OpenIcon from '@mui/icons-material/Launch';
import { colors } from '../../theme';
import {useNavigate} from "react-router-dom"

const BoardCard = ({name,color,createdAt,id}) => {
    const navigate=useNavigate();

    return (
        <Grid item xs={12} sm={2}  md={3} width={{sm:280,xs:350}}>
            <Stack
                p={3}
                spacing={1}
                bgcolor="background.paper"
                borderLeft="7px solid"
                borderColor={colors[color] || colors.blue}
                borderRadius={2}
                boxShadow={2}
                height="100%"
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box width={'110%'} whiteSpace={'nowrap'} overflow="hidden" >
                        <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80%' }}
                        >
                            {name}
                        </Typography>
                    </Box>

                    <IconButton size="small" onClick={()=>navigate(`/boards/${id}`)}>
                        <OpenIcon />
                    </IconButton>
                </Stack>

                <Typography variant="caption" color="text.secondary">
                    Created at: {createdAt}
                </Typography>
            </Stack>
        </Grid>
    )
}
export default BoardCard;