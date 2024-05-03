import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { selectPosts } from '../Posts/postsSlice';
import React, { useEffect, useState } from 'react';
import { getPosts } from '../Posts/postsThunk';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { selectComments, selectIsLoading } from './commentsSlice';
import { CommentsPost } from '../../types';
import { selectUser } from '../Users/userSlice';
import { getComments, sendComment } from './commentsThunk';
import {Box, Button, Card, CardContent, CardMedia, CircularProgress, Grid, TextField, Typography} from '@mui/material';

const Comments = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const params = useParams();
    const comments = useAppSelector(selectComments);
    const isLoading = useAppSelector(selectIsLoading);
    const user = useAppSelector(selectUser);

    const [state, setState] = useState<CommentsPost>({
        post: '',
        textComment: '',
        token: '',
    });

    useEffect(() => {
        const fetchUrl = async () => {
            await dispatch(getPosts());
            if (params.id) {
                await dispatch(getComments(params.id));
            }
        };

        void fetchUrl();
    }, [dispatch]);


    const fetchUrl = async () => {
        if (params.id) {
            await dispatch(getComments(params.id));
        }
    };

    const formSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (params.id && user) {
            await dispatch(sendComment({token: user.token, post: params.id, textComment: state.textComment}));
        }

        setState((prevState) => ({
            ...prevState,
            textComment: '',
        }));

        void fetchUrl();
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const post = posts.find(postElem => postElem._id === params.id);
    return (
        <>
            {post && (
                <Grid item xs={12}>
                    <Card sx={{ width: 800, ml: 'auto', mr: 'auto', mb: '20px' }}>
                        <CardContent sx={{ display: 'flex', gap: 3 }}>
                            {post.image && (
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: '30%',
                                        border: '1px solid #000',
                                        paddingTop: '30%' // Поддерживаем пропорциональное заполнение (можно убрать если нужно)
                                    }}
                                    image={`http://localhost:8000/${post.image}`}
                                />
                            )}
                            <Typography component="div" sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    {format(new Date(post.datetime), 'yyyy-MM-dd HH:mm:ss')}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {post.user.username}
                                </Typography>
                                <Typography component="div">
                                    {post.title}
                                </Typography>
                                <Typography component="div">
                                    {post.description}
                                </Typography>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}

            <Grid sx={{ display: 'flex', gap: 2 }}>
                {user && (
                    <Box component="form" onSubmit={formSubmit}>
                        <TextField
                            label="textComment"
                            name="textComment"
                            value={state.textComment}
                            onChange={inputChangeHandler}
                            sx={{ width: 400 }} // Уточните ширину если нужно
                        />
                        <Button type="submit" variant="contained" color="primary">Send</Button>
                    </Box>
                )}
            </Grid>

            <Grid container sx={{ mt: '20px' }}>
                {!isLoading ? comments.map(elem => (
                    <Grid item xs={12} sx={{ border: "1px solid #000", m: '10px', p: '5px' }} key={elem._id}>
                        <Typography variant="h5">
                            {elem.user.username}
                        </Typography>
                        <Typography component="div">
                            {elem.textComment}
                        </Typography>
                    </Grid>
                )) : <CircularProgress />}
            </Grid>
        </>
    );
};

export default Comments;