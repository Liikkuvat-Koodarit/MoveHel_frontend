import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

export default function AddUser({onAddUser}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleSave = () => {
        const userData = {
            username: username,
            email: email,
            password: password
        };
        onAddUser(userData);
        setUsername('');
        setEmail('');
        setPassword('');
        handleClose();
        console.log("HANDLE SAVE:", userData);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    AddUser.propTypes = {
        onAddUser: PropTypes.func.isRequired
    };

    return (
      <div>
        <div style={{ float: 'right' }}>
            <Button  onClick={handleClickOpen}>
                Rekisteröidy
            </Button>
        </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Rekisteröidy</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        label="Käyttäjänimi"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        label="Sähköposti"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        label="Salasana"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Tallenna</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
