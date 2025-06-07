import { Snackbar } from "@mui/material";
import  useStore  from "../../store";

const SnakbarManager = () => {
    const { toastMsg, setToastMsg } = useStore();

    return (
        <Snackbar
            message={toastMsg}
            open={!!toastMsg}
            autoHideDuration={5000}
            onClose={() => setToastMsg('')} 
            anchorOrigin={{ 
                vertical: 'top',
                horizontal: 'ceter'
            }}
        />
    )
}

export default SnakbarManager;
