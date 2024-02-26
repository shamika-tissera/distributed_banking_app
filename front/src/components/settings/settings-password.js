import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import swal from 'sweetalert';

export const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const validateInput = () => {
    if (values.password === '' || values.confirm === '') {
      swal("Error", "Please fill all the fields", "error");
      return false;
    }
    if (values.password !== values.confirm) {
      swal("Error", "Password and confirm password do not match", "error");
      return false;
    }
    return true;
  }

  const handleSubmit = (event) => {
    if (!validateInput()) {
      return;
    }
    event.preventDefault();
    swal("Success", "Password updated successfully", "success")
  }

  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password*"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password*"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};
