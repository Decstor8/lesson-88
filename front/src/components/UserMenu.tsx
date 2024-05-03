import React, {useState} from 'react';
import {UserTypes} from '../types';
import {Button, Menu, MenuItem} from '@mui/material';

interface Props {
    user: UserTypes;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button color="inherit" onClick={handleClick}>
                Рады вас видеть!, {user.username}!
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
                <MenuItem>Выйти</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;