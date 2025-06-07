import { useNavigate, useParams } from "react-router-dom";
import BoardInterface from "./BoardInterface";
import BoardTopbar from "./BoardTopbar";
import useStore from "../../store";
import { useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import useApp from "../../hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";
import BoardNotReady from "./BoardNotReady";


const BoardScreen2 = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [loading, setLoading] = useState(true);
    const { boards, areBoardsFetched } = useStore();
    const { boardId } = useParams();
    const board = useMemo(() => boards.find(b => b.id === boardId), []);
    const boardData = useMemo(() => data, [data]);

    const { fetchBoards,deleteBoard } = useApp();

    const handleUpdateLastUpdated = useCallback(() => setLastUpdated(new Date().toLocaleString("en-us")), []);

    const handelFetchBoard = async () => {
        try {
            const boardData = await fetchBoards(boardId);
            if (boardData) {
                const { lastUpdated, tabs } = boardData;
                setData(tabs);
                setLastUpdated(lastUpdated.toDate().toLocaleString("en-us"));
                console.log("Fetched board data: ", boardData);
            }
            setLoading(false);

        } catch (error) {
            console.error("Error fetching board: ", error);

        }
    }

    const handleDeleteboard = useCallback(async () => {
        if (!window.confirm("Are you sure you want to delete this board? This action cannot be undone."))return;

        try {

            setLoading(true);
            await deleteBoard(boardId);

        } catch (error) {
            console.error("Error deleting board: ", error);
            setLoading(false);

        }
    },[]);

    useEffect(() => {
        if (!areBoardsFetched || !board) {
            navigate("/boards");
        }
        else {
            handelFetchBoard();
        }

    }, []);

    if (!boards) return null
    if (loading) return <AppLoader />;
    if (!data) return <BoardNotReady />

    return (
        <div>
            <BoardTopbar
                name={board.name}
                color={board.color}
                lastUpdated={lastUpdated}
                deleteBoard={handleDeleteboard}
            />

            <BoardInterface
                boardData={boardData}
                boardId={boardId}
                handleUpdateLastUpdated={handleUpdateLastUpdated}
            />

        </div>
    )
}
export default BoardScreen2;