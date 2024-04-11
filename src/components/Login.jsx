import React, { useState } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

export default function Login({onLogin}) {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleSave = () => {
        const loginData = {
            username: username,
            password: password
        };
        onLogin(loginData);
        setUsername('');
        setPassword('');
        handleClose();
    };

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      Login.propTypes = {
        onLogin: PropTypes.func.isRequired
    };

    return(
        <div>
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Kirjaudu sisään
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Kirjaudu sisään</DialogTitle>
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
            type="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            label="Salasana"
            fullWidth
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Kirjaudu sisään</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
        </div>
    );
}