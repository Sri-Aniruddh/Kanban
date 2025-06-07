import { useState } from "react";
import { Dialog, Typography, Stack, IconButton, Chip, OutlinedInput, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const AddTaskModel = ({tabName,onClose,addTask,loading}) => {
const [text,setText]=useState('');

    return (
        <Dialog open={true}  fullWidth maxWidth="xs" >
            <Stack p={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                    <Typography variant="h6" fontWeight={700}>Add task</Typography>
                    <IconButton onClick={onClose} >
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography  >Status:</Typography>
                        <Chip size="small" label={tabName} />

                    </Stack>
                    <OutlinedInput  value={text} onChange={e=> setText(e.target.value)} placeholder="Task"/>
                    <Button disabled={loading} onClick={()=>addTask(text)} variant="contained" >Add task</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}
export default AddTaskModel;