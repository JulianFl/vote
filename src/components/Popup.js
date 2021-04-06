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
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Popup = (props) => {

    const openPopup = props.openPopup;
    const setOpenPopup = props.setOpenPopup;
    const firestore = firebase.firestore();
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        const messagesRef = firestore.collection('messages');
        //const { uid, photoURL } = auth.currentUser;
        if (message && name){
            await messagesRef.add({
                name: name,
                text: message,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            setMessage('');
            setName('');
            setOpenPopup(false);

        }

    }


    return (
            <Dialog
                open={openPopup}
                onClose={() => {setOpenPopup(false)}}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle id="customized-dialog-title">
                    Nachricht senden
                </DialogTitle>

                <DialogContent>

                        <TextField
                            label="Name"
                            placeholder="Name"
                            fullWidth
                            margin="dense"
                            autoFocus
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Nachricht"
                            placeholder="Nachricht"
                            multiline
                            fullWidth
                            required
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpenPopup(false)}} color="primary">
                        Abbrechen
                    </Button>
                    <Button onClick={sendMessage} color="primary">
                        Senden
                    </Button>
                </DialogActions>
            </Dialog>
        );

}

export default Popup;
