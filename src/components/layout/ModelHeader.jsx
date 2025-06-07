import { IconButton, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const ModelHeader = ({ title, onClose }) => {


    return (
        <Stack direction="row" justifyContent={"space-between"} alignItems="center">
            <Typography variant="h5" fontWeight={700} >{title}</Typography>
            <IconButton
                onClick={onClose}
                size='small'>
                <CloseIcon />
            </IconButton>
        </Stack>
    )
}
export default ModelHeader;
