import { Stack, Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Draggable } from "@hello-pangea/dnd";

const Task = ({ id, text, removeTask,index }) => {


    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => <Stack direction="row"
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
                alignItems="center" spacing={1}>

                <Typography p={1}
                    width="100%"
                    border="1px solid"
                    borderColor="#777980"
                    bgcolor="#45475E" >{text}</Typography>

                <IconButton onClick={removeTask} >
                    <DeleteIcon />
                </IconButton>
            </Stack>}
        </Draggable>
    )
}
export default Task;