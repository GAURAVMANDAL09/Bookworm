import { Paper, Grid, makeStyles, } from '@material-ui/core'
import React from 'react'
import Profileform from './Profileform'

const useStyles = makeStyles((theme) => ({
    pageContent:{
        margin:theme.spacing(5),
        padding: theme.spacing(3)
    }
  }));

const Profile = () => {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.pageContent}>
            <Profileform />
            </Paper>
        </div>
    )
}

export default Profile
