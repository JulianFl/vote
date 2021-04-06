import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import firebase from "../firebase";
import 'firebase/firestore'
import _SnackbarMessage from "./_SnackbarMessage";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import CardContent from "@material-ui/core/CardContent"
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NewData = (props) => {

    const openPopup = props.openPopup;
    const setOpenPopup = props.setOpenPopup;
    const setupload = props.setupload;


    const handleSubmit = (e) => {

        var reader = new FileReader();
        reader.readAsText(e);
        reader.onload = r => {
            var lines = reader.result.split("\n");

            var result = [];
            var headers = lines[0].split(",");
            var allHeaders = headers[0].split(";");


            for (var i = 1; i < lines.length; i++) {
                var obj = {};
                var currentline = lines[i].split(",");
                var allLines = currentline[0].split(";");
                for (var j = 0; j < allHeaders.length; j++) {
                    obj[allHeaders[j]] = allLines[j];
                }
                result.push(obj);
            }
            addToFirebase(result)

        };
    };
    const addToFirebase = (upload) => {
        upload.forEach(function (e) {
            firebase.database().ref('songs').push({
                title: e.title,
                artist: e.artist,
                counter: 0
            });
        })
    }
    const handleDelete  = () =>{
        localStorage.clear();
        firebase.database().ref('songs').remove();
        handleSubmit(props.newUpload);
        document.getElementById('file').value = null;
        setupload('');
        setOpenPopup(false);
    }
    const cancel  = () =>{
        document.getElementById('file').value = null;
        setupload('');
        setOpenPopup(false);
    }
    return (
            <Dialog
                open={openPopup}
                onClose={() => {setOpenPopup(false)}}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle id="customized-dialog-title">
                    Sind Sie sich sicher?
                </DialogTitle>

                <DialogContent>
                    <Typography variant="body2">
                        Wollen Sie die Inhalte wirklich ersetzen?
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button onClick={cancel} color="primary">
                        Abbrechen
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Hochladen
                    </Button>
                </DialogActions>
            </Dialog>
        );

}

export default NewData;
