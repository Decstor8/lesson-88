import {AppBar, Grid, Link, Toolbar, Typography} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AnonymousMenu from './SecretMenu';
import {selectUser} from '../features/Users/userSlice';
import {useAppSelector} from '../App/hooks';
import UserMenu from './UserMenu';


const AppBarr = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <AppBar position="sticky" sx={{ mb: 2 }}>
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none', '&:hover': { color: 'inherit' } }}>
                                Reddit
                            </Link>
                        </Typography>
                        {user ? (
                            <UserMenu user={user} />
                        ) : (
                            <AnonymousMenu />
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default AppBarr;