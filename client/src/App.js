import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from @material-ui/core;
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts'
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import memories from './images/memories.png';
import usestyles from './styles'

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = usestyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [ currentId, dispatch ]);

    return(
        <div>
            <Container maxwidth="lg">
                <AppBar className={classes.AppBar} position="static" color="inherit">
                    <Typography className={classes.heading} variant="h2" align="center">
                        Memories
                    </Typography>
                    <img  className={classes.image} src={memories} alt="memories" height="60" />
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid item x5={12} sm={7}>
                                <Posts setCurrentId={setCurrentId} />
                            </Grid>
                            <Grid item x5={12} sm={4}>
                                <Form currentId={currentId} setCurrentId={setCurrentId} />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </div>
    );
}

export default App;