import { memo } from "react";
import { Grid, Stack, Typography, IconButton, useMediaQuery } from "@mui/material";
import AddIcon from '@mui/icons-material/AddCircleOutline';
import Task from "./Task";
import { Droppable } from "@hello-pangea/dnd";

const BoardTab = ({ name, tasks, openAddTaskModel, status, removeTask }) => {
    console.log("Tabs:", name);
    const isXs = useMediaQuery(theme=>theme.breakpoints.only('xs')); //mobile view

    return (
        
        <Droppable droppableId={status}>
            {(provided) => <Grid {...provided.droppableProps} ref={provided.innerRef} item xs={2} >
                <Stack p={2} bgcolor="#000" width={{sm:300,xs:350}} ml={{sm:7,xs:0}}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" fontWeight={400}>{name}</Typography>
                        <IconButton onClick={() => openAddTaskModel(status)}><AddIcon fontSize="small" /></IconButton>
                    </Stack>
                    <Stack spacing={2} mt={3}>
                        {tasks && tasks.map((task,index) => (<Task
                            key={task.id}
                            text={task.text}
                            id={task.id}
                            removeTask={() => removeTask(status, task.id)} 
                            index={index}
                            />)
                        )}

                    </Stack>
                    {provided.placeholder}
                </Stack>
            </Grid>}
        </Droppable>
    )
}
export default memo(BoardTab);