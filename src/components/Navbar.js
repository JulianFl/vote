import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {useHistory} from "react-router-dom";

import Add from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {useState} from 'react'

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        position: 'fixed',
        bottom: '0',
        width: '100%',
        zIndex: '50',
    },
});

const Navbar = () => {

    const classes = useStyles();
    const [value, setValue] = useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Musikliste" icon={<QueueMusicIcon/>} component={Link} to="/"/>
            <BottomNavigationAction label="Nachrichten" icon={<ChatBubbleIcon/>} component={Link} to="/messages"/>
        </BottomNavigation>
    );
}

export default Navbar;