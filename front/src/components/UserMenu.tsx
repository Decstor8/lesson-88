import React, {useState} from 'react';
import {UserTypes} from '../types';
import {Button, Menu, MenuItem} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../App/hooks";
import {logout} from "../features/Users/userThunks";

interface Props {
    user: UserTypes;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const postNavigate = () => {
        navigate('/new');
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <>
            <Button color="inherit" onClick={handleClick}>
                Рады вас видеть!, {user.username}!
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
                <MenuItem onClick={postNavigate}>Создать новый пост</MenuItem>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;