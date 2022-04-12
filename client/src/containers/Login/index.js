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

const Login = () => {
  const theme = createTheme();
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
      })
      .catch( err => {
        setLoading( false );
        setMessage( err.response.data.detail.toString() );
      });
  };

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
      username: Yup.string().trim().required("* Username is required."),
      password: Yup.string().trim().required("* Password is required."),
    }),
  });

  return (
    <RootContainer>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              mt: 8,
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
              {
                message &&
                <Typography variant="body2" sx={{ textAlign: 'center', color: 'red' }}>
                  { message }
                </Typography>
              }
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                {...formik.getFieldProps('username')}
                // value={ formik.values.username }
                // onChange={ formik.handleChange }
                // onBlur={ formik.handleBlur }
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left'
                }}
              >
                {
                  formik.touched.username && formik.errors.username &&
                  <Typography variant="body1" children={ formik.errors.username } />
                }
                {
                  formik.touched.password && formik.errors.password &&
                  <Typography variant="body1" children={ formik.errors.password } />
                }
              </Box>
              <Box
                sx={{
                  mt: 1,
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  disabled={ loading }
                >
                  Sign In
                </Button>
              </Box>
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
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </RootContainer>
  )
}

export default Login;