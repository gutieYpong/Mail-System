import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import authSlice from '../../features/authSlice';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;

  background-color: lightpink;
`;

const theme = createTheme();

const Login = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = ( username, password ) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login/`, { username, password }, {
        headers: {  // can post without this header, just to specify it here
          'Content-Type': 'application/json',
        }
      })
      .then( res => {
        dispatch(
          authSlice.actions.setAuthTokens({
            token: res.data.access,
            refreshToken: res.data.refresh,
          })
        );
        dispatch( authSlice.actions.setAccount(res.data.user) );
        setLoading( false );
        navigate("/");
        // navigate("/profile", {
        //   state: {
        //     userId: res.data.user.id
        //   }
        // });
      })
      .catch( err => {
        setMessage( err.response.data.detail.toString() );
        setLoading( false );
      });
  };

  //* ... MUI default function ...
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      setLoading(true);
      handleLogin(values.username, values.password);
    },
    validationSchema: Yup.object({
      username: Yup.string().trim().required("Username is required."),
      password: Yup.string().trim().required("Password is required."),
    }),
  });

  return (
    <RootContainer>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={ formik.handleSubmit }
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={ formik.values.username }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={ formik.values.password }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={ loading }
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {
                formik.errors.username ? 
                <Typography component="h1" variant="h6" children={ formik.errors.username } /> : null
              }
              {
                formik.errors.password ? 
                <Typography component="h1" variant="h6" children={ formik.errors.password } /> : null
              }
              <Typography component="h1" variant="h5">
                Message: { message }
              </Typography>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </RootContainer>
  )
}

export default Login;