import { Grid } from "@mui/material";
import BoardTab from "./BoardTab";
import { useCallback, useState } from "react";
import AddTaskModel from "./AddTaskModel";
import useApp from "../../hooks/useApp";
import useStore from "../../store";
import { DragDropContext } from "@hello-pangea/dnd";

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const statusMap = { todos: "Todos", isProgress: "In Progress", complete: "Complete" };

const BoardInterface = ({ boardData, boardId, handleUpdateLastUpdated }) => {

    const [loading, setLoading] = useState(false);

    const [addTaskTo, setAddTaskTo] = useState("");
    const [tabs, setTabs] = useState(structuredClone(boardData))
    const { updateBoardData } = useApp();
    const { setToastMsg } = useStore();

    const handelOpenAddTaskModel = useCallback((status) => setAddTaskTo(status), []);

    const handleAddTask = async (text) => {
        if (!text.trim()) return setToastMsg("Task text cannot be empty");
        const dclone = structuredClone(tabs);
        const newTask = { text, id: crypto.randomUUID() };

        if (!Array.isArray(dclone[addTaskTo])) {
            dclone[addTaskTo] = []; // ensure it exists and is an array
        }

        dclone[addTaskTo].unshift(newTask);
        // dclone[addTaskTo].unshift({ text, id: crypto.randomUUID() });
        try {
            setLoading(true);
            await sleep();
            await updateBoardData(boardId, dclone);
            setTabs(dclone);
            setAddTaskTo("");
            handleUpdateLastUpdated();
        } catch (error) {
            console.error("Error adding task: ", error);

        } finally {
            setLoading(false);
        }
    }

    const handelRemoveTask = useCallback(async (tab, taskId) => {
        const declone = structuredClone(tabs);
        const taskIdx = declone[tab].findIndex(t => t.id === taskId);
        declone[tab].splice(taskIdx, 1);
        try {
            await updateBoardData(boardId, declone);
            setTabs(declone);
            handleUpdateLastUpdated();
        } catch (error) {
            console.error("Error removing task: ", error);

        }
    }, [tabs]);

    const handleDragEnd = async (result) => {
        const { source, destination } = result;

        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return;

        const updatedTabs = structuredClone(tabs);

        if (!updatedTabs[source.droppableId] || !updatedTabs[destination.droppableId]) {
            console.warn("Invalid drag", source, destination);
            return;
        }

        const sourceTasks = Array.from(updatedTabs[source.droppableId]);
        const [movedTask] = sourceTasks.splice(source.index, 1);

        const destinationTasks = Array.from(updatedTabs[destination.droppableId]);
        destinationTasks.splice(destination.index, 0, movedTask);

        updatedTabs[source.droppableId] = sourceTasks;
        updatedTabs[destination.droppableId] = destinationTasks;

        setTabs(updatedTabs);

        try {
            await updateBoardData(boardId, updatedTabs);
            handleUpdateLastUpdated();
        } catch (error) {
            console.error("Error updating task order: ", error);
        }
    };


    return (
        <>
            {!!addTaskTo && <AddTaskModel
                tabName={statusMap[addTaskTo]}
                onClose={() => setAddTaskTo("")}
                addTask={handleAddTask}
                loading={loading} />
            }

            <DragDropContext onDragEnd={handleDragEnd}>
                <Grid container px={3} mt={2} spacing={2}>
                    {Object.keys(statusMap).map((status) => (
                        <BoardTab
                            key={status}
                            tasks={tabs[status]}
                            status={status}
                            name={statusMap[status]}
                            openAddTaskModel={handelOpenAddTaskModel}
                            removeTask={handelRemoveTask} />
                    ))}
                </Grid>
            </DragDropContext>
        </>
    )
}
export default BoardInterface;