import {useEffect, useState} from "react";
import firebase from "../firebase";
import React from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import MenuIcon from '@material-ui/icons/Menu';
import Slide from "@material-ui/core/Slide";
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import MailIcon from '@material-ui/icons/Mail';
import CloudUpload from '@material-ui/icons/CloudUpload';
import ChevronDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Refresh from '@material-ui/icons/Refresh';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NewData from "./NewData";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: '100%',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    hide: {
        display: 'none',
    },
    drawer: {
        flexShrink: 0,
        zIndex: '51'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));


const Menu = () => {
    const [upload, setupload] = useState('');
    const fileUpload = React.createRef();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        if (upload){
            setOpenPopup(true);
        }
    },[upload]);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const toggleChecked = () => {
        setChecked((prev) => !prev);
    };
    const restart = () => {
        localStorage.clear();
        var songs = firebase.database().ref('songs');
        songs.on('value', (snapshot) => {
            var snap = snapshot.val();
            for (let id in snap){
                songs.child(id).update({counter: 0})
            }
        });
    };
    const triggerClick = () => {
        fileUpload.current.click();
    }
    return (
        <div>
            <div className='floatingButton'>
                        <Fab
                            color="primary"
                            onClick={handleDrawerOpen}
                            aria-label="add"
                        >
                            <MenuIcon/>
                        </Fab>
            </div>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="bottom"
                open={open}

            >
                <div className={classes.drawerHeader}>

                    <IconButton onClick={handleDrawerClose}>
                         <ChevronDownIcon/>
                    </IconButton>
                </div>
                <Divider/>

                <List>
                    <ListItem button>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={checked} onChange={toggleChecked} />}
                                label="Karaoke Modus"
                            />
                        </FormGroup>
                    </ListItem>

                        <ListItem button onClick={triggerClick}><ListItemIcon> <CloudUpload/></ListItemIcon><ListItemText primary="Hochladen"/></ListItem>

                    <ListItem button>
                        <ListItemIcon> <Refresh/></ListItemIcon>
                        <ListItemText primary="Restart" onClick={restart}/>
                    </ListItem>
                </List>
                <input
                    type="file"
                    id="file"
                    accept="text/csv"
                    ref={fileUpload}
                    onChange={(e) => {
                        setupload(e.target.files[0])
                    }}
                />
            </Drawer>
            <NewData openPopup={openPopup} setOpenPopup={setOpenPopup} setupload={setupload} newUpload={upload}/>

        </div>
    );
}

export default Menu;