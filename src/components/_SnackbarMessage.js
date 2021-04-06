import React, {useState} from "react";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from "@material-ui/core/Slide";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const _SnackbarMessage = (props) => {

    const openSnackbar = props.openSnackbar;
    const setOpenSnackbar = props.setOpenSnackbar;
    const snackbarKind = props.snackbarKind;


    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
         <Snackbar
             open={openSnackbar}
             autoHideDuration={6000}
             onClose={handleCloseSnackbar}
         >
            <Alert severity={snackbarKind} onClose={handleCloseSnackbar} >
                Sorry, Man kann nur einmal für ein Lied abstimmen!
            </Alert>
        </Snackbar>
    )
}

export default _SnackbarMessage;