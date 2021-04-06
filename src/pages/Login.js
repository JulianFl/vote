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
import Button from "@material-ui/core/Button";

import React from "react";
import {makeStyles} from "@material-ui/core/styles";
const auth = firebase.auth();
const firestore = firebase.firestore();

const Login = () => {
    const [user] = useAuthState(auth);
    return (
        <div className="">

                <article className="container mx-auto login" >
                    <Container maxWidth="sm">
                        {user ? (<SignOut />): (<SignIn />)}
                    </Container>
                </article>
        </div>
        /* <article>
            { isLoading && <div>Loading...</div> }
            <div className="rangliste">

                {data &&
                data.sort((a,b) => a.counter < b.counter ? 1 : -1).map((song, index) =>(
                        <div key={index}>
                            <h1 >{song.title}</h1>
                            <h4>{song.counter}</h4>
                        </div>
                    )
                )}
            </div>

        </article>*/

    );
}



function SignIn() {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <>
            <Button onClick={signInWithGoogle} variant="contained" size="large" color="primary">
                Einloggen
            </Button>
        </>
    )

}


function SignOut() {
    return auth.currentUser && (
        <Button onClick={() => auth.signOut()} variant="contained" size="large" color="primary">
            Ausloggen
        </Button>
    )
}

export default Login;
