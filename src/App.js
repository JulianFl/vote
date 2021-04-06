import './App.css';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';

import Menu from './components/Menu';
import Music from './pages/MusicList';
import Navbar from './components/Navbar';
import Ranking from './components/_rangliste';
import Messages from './pages/messages';
import Login from './pages/Login';
import 'firebase/auth';
import firebase from './firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import { createMuiTheme,  ThemeProvider } from '@material-ui/core';

const auth = firebase.auth();
const theme = createMuiTheme({
    palette:{
        primary:{
            main: '#007fad'
        }
    }
});


function App() {
    const [user] = useAuthState(auth);
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <div className="content">
                        <Switch>
                            <Route exact path="/">
                                <Music />
                            </Route>
                            <Route exact path="/messages">
                                {/*user &&  <Messages />*/}
                                <Messages />
                            </Route>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                        </Switch>
                    </div>
                    {/*user && <Navbar/>*/}
                     <Navbar/>
                </div>
            </Router>
        </ThemeProvider>
  );
}
/*
function SignIn() {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <>
            <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        </>
    )

}

function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}*/
export default App;
