import { useState } from 'react';
import { Dialog, Stack, Typography, Box, TextField, Button } from '@mui/material'
import { colors } from '../../theme';
import ModelHeader from '../../components/layout/ModelHeader';
import useApp from '../../hooks/useApp';
import useStore from '../../store';

const CreateBoardsModel = ({ closedModel }) => {
    const { createBoard } = useApp();
    const [name, setName] = useState("");
    const [color, setColor] = useState(colors[0]);
    const [loading, setLoading] = useState(false);
    const {setToastMsg}=useStore();

    const handleCreate = async () => {
        if(!name.trim()) return setToastMsg("You need to enter a board name.") ;
        if(name.length > 20)return setToastMsg("Board name can't be 20 char.");
        try {
            setLoading(true);
            await createBoard({
                name,
                color
            });
            closedModel();
        } catch (error) {
            setLoading(false);
            console.log("Error creating board: ", error);

        }
    }

    return (
        <Dialog onClose={closedModel} open maxWidth="xs" fullWidth>
            <Stack sx={{ padding: 2 }} spacing={2}>
                <ModelHeader
                    onclose={closedModel}
                    title="Create Board"
                />
                <Stack my={5} spacing={3}>
                    <TextField label="Board name" value={name} onChange={e => setName(e.target.value)} />
                    <Stack direction={"row"} spacing={2}>
                        <Typography>Color : </Typography>
                        <Stack direction={"row"} spacing={1} >
                            {colors.map((clr, idx) => <Box

                                onClick={() => setColor(idx)}
                                key={clr}
                                height={25}
                                width={25}
                                sx={{
                                    backgroundColor: clr, 
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    border: idx === color ? '3px solid #383838' : 'none',
                                    outline:idx === color ? `2px solid ${clr}` : 'none'
                                }} />)}
                        </Stack>
                    </Stack>
                </Stack>
                <Button disabled={loading} onClick={handleCreate} variant='contained' color='primary' sx={{ fontWeight: 700 }}>
                    Create
                </Button>
            </Stack>
        </Dialog>
    );
}
export default CreateBoardsModel;