import {useEffect, useRef, useState} from "react";
import firebase from "../firebase";
import 'firebase/firestore';
import { purple } from '@material-ui/core/colors';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

import React from "react";
const auth = firebase.auth();
const firestore = firebase.firestore();

const Messages = () => {
    const [user] = useAuthState(auth);

    return (
        <div>
            <article className="container mx-auto">
                <Container maxWidth="sm">
                    <ChatRoom />
                </Container>
            </article>
        </div>
    );
}
function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });
    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    },[messages]);

        return (<>

        <main>

            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            <div ref={dummy}></div>

        </main>

    </>)

}


function SignIn() {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <>
            <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
            <p>Do not violate the community guidelines or you will be banned for life!</p>
        </>
    )

}


function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

function ChatMessage(props) {
    const { name, text} = props.message;


    return (<>

        <div className='message'  >
            <Card className="chatStyle">
                <CardContent>
                <Typography variant="subtitle2" >{name}</Typography>
                <Typography paragraph>{text}</Typography>
                </CardContent>

            </Card>

        </div>
    </>)
}
export default Messages;
