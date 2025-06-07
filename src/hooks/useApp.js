import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

const useApp = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    const boardsColRef = collection(db, `users/${uid}/boards`);

    const { boards, setBoards, addBoard, setToastMsg } = useStore();

    if (!uid) {
        setToastMsg("User not logged in");
        return null;
    }

    const updateBoardData = async (boardId, tabs) => {
        const docRef = doc(db, `users/${uid}/boards/${boardId}`);

        try {
            await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });


        } catch (error) {
            setToastMsg("Error updating board data: ");
            throw error;
        }
    }

    const fetchBoards = async (boardId) => {
        const decRef = doc(db, `users/${uid}/boards/${boardId}`);
        try {
            const doc = await getDoc(decRef);
            if (doc.exists()) {
                return doc.data();
            }
            else {
                return null;
            }
        } catch (err) {
            setToastMsg("Error fetching boards: ");
            throw err;
        }
    }

    const createBoard = async ({ name, color }) => {
        try {
            const doc = await addDoc(boardsColRef, {
                name,
                color,
                createdAt: serverTimestamp(),
            });
            addBoard({ name, color, createdAt: new Date().toLocaleString("en-us"), id: doc.id });

        } catch (error) {
            setToastMsg("Error creating board: ");
            throw error;
        }
    }

    const fetchBoard = async (setLoading) => {
        try {
            const q = query(boardsColRef, orderBy("createdAt", "desc"))
            const querySnapshot = await getDocs(q);
            const boards = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                createdAt: doc.data().createdAt ? doc.data().createdAt.toDate().toLocaleString("en-us") : null,
            }));
            setBoards(boards);
            console.log("Fetched boards: ", boards);


        } catch (error) {
            console.log("Error fetching boards: ", error);
            throw error;

        } finally {
            if (setLoading) setLoading(false);
        }
    }

    const deleteBoard = async (boardId) => {
        try {
            const docRef = doc(db, `users/${uid}/boards/${boardId}`);
            await deleteDoc(docRef);

            //updtate the board 
            const tempBoards = boards.filter(boards => boards.id !== boardId);
            setBoards(tempBoards);

            navigate("/boards");
            setToastMsg("Board deleted successfully");

        } catch (error) {
            setToastMsg("Error deleting board: ");
            throw error;

        }
    }

    return {
        createBoard, fetchBoard, fetchBoards, updateBoardData, deleteBoard
    }
}
export default useApp;