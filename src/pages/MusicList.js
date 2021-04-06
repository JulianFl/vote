import {useEffect, useState} from "react";
import firebase from "../firebase";
import React from 'react';
import Popup from '../components/Popup';

import GetData from "../components/useFetch";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddCSV from '../components/Menu'

import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Badge from '@material-ui/core/Badge';
import Backdrop from '@material-ui/core/Backdrop';
import _SnackbarMessage from '../components/_SnackbarMessage';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useAuthState} from "react-firebase-hooks/auth";
const auth = firebase.auth();

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: '0 auto',
        backgroundColor: 'black'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    white:{
        color: 'white'
    },
    border:{
        borderBottom: '1px solid white',
        '&:last-of-type':{
            borderBottom: 'none',
        }
    },
    noPadding:{
        padding: 4
    }
}));


const ListData = () => {

    const {data, isLoading} = GetData();
    const [openPopup, setOpenPopup] = useState(false);
   // const [openSnackbar, setOpenSnackbar] = useState(false);
   // const [snackbarKind, setSnackbarKind] = useState('');
    const [isFavourite, setIsFavourite] = useState('');
    const classes = useStyles();
    const [user] = useAuthState(auth);

    const handleHeart = (id, counter) => {
        var count = counter ;
        if (!localStorage.getItem(id)){
            count = count + 1;
            setOpenPopup(true);
            firebase.database().ref('songs').child(id).update({counter: count});
            localStorage.setItem(id, true)
        }else {
            count = count - 1;
            firebase.database().ref('songs').child(id).update({counter: count});
            localStorage.removeItem(id);
        }
    };
    const handleStar = (id, counter) => {

        var count = counter;

        if (!localStorage.getItem('favourite')){
            localStorage.setItem('favourite', id);
            count = count + 5;
            firebase.database().ref('songs').child(id).update({counter: count});
            setIsFavourite(localStorage.getItem('favourite'));
            setOpenPopup(true);

        }else if(id === localStorage.getItem('favourite')){
            count = count - 5;
            firebase.database().ref('songs').child(id).update({counter: count});
            localStorage.removeItem('favourite');
           // setSnackbarKind('error');
            setIsFavourite(localStorage.getItem('favourite'));
        }else {

            var oldCounter = firebase.database().ref('songs').child(localStorage.getItem('favourite'));
            oldCounter.once('value', (snapshot) => {
                var oldcount = snapshot.val().counter;
                oldcount = oldcount - 5;
                snapshot.ref.update({counter: oldcount});
            });


            count = count + 5;
            localStorage.removeItem('favourite');
            localStorage.setItem('favourite', id);
            firebase.database().ref('songs').child(id).update({counter: count});
            setIsFavourite(localStorage.getItem('favourite'));
            setOpenPopup(true);

        }
    };



    return (
        <article className="container mx-auto">
            <Container maxWidth="lg">

                <Grid
                    container
                    style={{paddingBottom: 60}}
                >

                    {/*user &&  <AddCSV />*/}
                    <AddCSV />

                    <Backdrop className={classes.backdrop} open={isLoading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>

                    {data && data.map((song, index) =>(
                    <Grid
                        key={index}
                        onDoubleClick={() => handleHeart(song.id, song.counter)}
                        item
                        xs={12}
                        md={6}
                        lg={4}
                        className={classes.border}
                    >

                        <Card className={classes.root} >
                            <CardContent>
                                <Typography variant="h5" component="h2" className={classes.white}>
                                    {isLoading ? <Skeleton/> : song.title}
                                </Typography>
                                <Typography className={classes.white}>
                                    {isLoading ? <Skeleton/> : song.artist}
                                </Typography>

                            </CardContent>



                            <CardActions  className={classes.noPadding}>

                                <IconButton
                                    className={classes.white}
                                    onClick={() => handleHeart(song.id, song.counter)}
                                >
                                    <Badge
                                        badgeContent={song.counter}
                                        color="secondary"
                                    >
                                        { !localStorage.getItem(song.id) ? ( <Icon>favorite_border</Icon>):( <Icon>favorite</Icon>)}
                                    </Badge>
                                </IconButton>
                                <IconButton className={classes.white}  onClick={() => handleStar(song.id, song.counter)}>
                                    {localStorage.getItem('favourite') == song.id ? <Icon style={{ color: '#ffb400' }}>star</Icon>: <Icon>star_border</Icon> }
                                </IconButton>

                            </CardActions>


                        </Card>

                    </Grid>

                    ))}
                </Grid>
                <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}/>

            </Container>
        </article>

    );

}

export default ListData;