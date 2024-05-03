import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { selectIsLoading, selectPosts } from './postsSlice';
import { Card, CardContent, CardMedia, Grid, Typography, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { getPosts } from './postsThunk';
import { format } from 'date-fns';
import { Link as LinkRouter } from 'react-router-dom';

const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const isLoading = useAppSelector(selectIsLoading);

    useEffect(() => {
        const fetchUrl = async () => {
            await dispatch(getPosts());
        };

        void fetchUrl();
    }, [dispatch]);

    return (
        <>
            <Grid container spacing={3} mt={3}>
                {!isLoading ? posts.map((elem) => (
                    <Grid item xs={12} key={elem._id}>
                        <Card sx={{ width: 800, ml: 'auto', mr: 'auto' }}>
                            <CardContent sx={{ display: 'flex', gap: 3 }}>
                                {elem.image && (
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: '30%',
                                            height: 140,
                                            border: '1px solid #000'
                                        }}
                                        image={`http://localhost:8000/${elem.image}`}
                                    />
                                )}
                                <Typography component="div" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {format(new Date(elem.datetime), 'yyyy-MM-dd HH:mm:ss')}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {elem.user.username}
                                    </Typography>
                                    <LinkRouter to={`/${elem._id}`}>{elem.title}</LinkRouter>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )) : <CircularProgress />}
            </Grid>
        </>
    );
};

export default Posts;
