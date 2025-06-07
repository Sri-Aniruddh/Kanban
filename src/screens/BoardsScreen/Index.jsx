import { useEffect, useState } from 'react';
import CreateBoardsModel from './CreateBoardsModel';
import Topbar from './Topbar';
import { Stack, Grid, } from '@mui/material';

import NoBoards from './NoBoards';
import BoardCard from './BoardCard';
import useApp from '../../hooks/useApp';
import AppLoader from '../../components/layout/AppLoader';
import useStore from '../../store';

const BoardsScreen = () => {
    const [showModel, setShowModel] = useState(false);
    const [loading, setLoading] = useState(false);

    const { fetchBoard } = useApp();
    const { boards, setBoards, areBoardsFetched, isLoggedIn } = useStore();


    useEffect(() => {
        if (isLoggedIn && !areBoardsFetched) {

            fetchBoard(setLoading);

        }
    }, [isLoggedIn]);


    if (loading) return <AppLoader />;
    return (
        <>
            <Topbar openModel={() => setShowModel(true)} />
            {showModel && < CreateBoardsModel closedModel={() => setShowModel(false)} />}
           

            {!boards.length? <NoBoards/>: <Stack px={3} mt={5}>
                <Grid container columns={4} spacing={{sm:4,xs:2}}>
                    {boards.map(board => <BoardCard key={board.id} {...board} />)}
                    
                </Grid>
            </Stack>}
        </>
    )
}
export default BoardsScreen;