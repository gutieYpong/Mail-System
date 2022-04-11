import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// import authSlice from '../../features/authSlice';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DraftsIcon from '@mui/icons-material/Drafts';
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

const Compose = () => {
  const accessToken = useSelector( state => state.persistedReducer.auth.token );
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSend = ( recipient, subject, body ) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/mail/compose/`, {
        'recipients': [recipient],
        'subject': subject,
        'body': body
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      .then( res => {
        console.log('mail sent.')
        setLoading( false );
      })
      .catch( err => {
        setMessage( err.response.data.detail.toString() );
        setLoading( false );
      });
  };

  const formik = useFormik({
    initialValues: {
      mailRecipient: '',
      mailSubject: '',
      mailBody: '',
    },
    onSubmit: values => {
      // setLoading(true);
      handleSend(values.mailRecipient, values.mailSubject, values.mailBody);
    },
    validationSchema: Yup.object({
      mailRecipient: Yup.string().trim().required("Recipient is required."),
      mailSubject: Yup.string().trim().required("Subject is required."),
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
              <DraftsIcon />
            </Avatar>

            <Box
              component="form"
              onSubmit={ formik.handleSubmit }
              noValidate
              sx={{
                mt: 1,
                textAlign: 'right',
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="mailRecipient"
                label="Recipient"
                type="text"
                id="mailRecipient"
                // autoComplete="current-password"
                value={ formik.values.mailRecipient }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              <TextField
                required
                fullWidth
                id="mailSubject"
                label="Subject"
                name="mailSubject"
                // autoComplete="subject"
                autoFocus
                value={ formik.values.mailSubject }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              <TextField
                id="mailBody"
                name="mailBody"
                multiline
                fullWidth
                rows={6}
                placeholder="Click here to write..."
                value={ formik.values.mailBody }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
                sx={{ mt: 1 }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={ loading }
              >
                Send
              </Button>
              {/* {
                formik.errors.username ? 
                <Typography component="h1" variant="h6" children={ formik.errors.username } /> : null
              }
              {
                formik.errors.password ? 
                <Typography component="h1" variant="h6" children={ formik.errors.password } /> : null
              } */}
              <Typography component="h1" variant="h5">
                Message: { message }
              </Typography>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </RootContainer>
  )

  // return (
  //   <div id="compose-view">
  //     <h3>New Email</h3>
  //     <form id="compose-form">
  //       <div class="form-group">
  //         From: <input disabled class="form-control" value="{{ request.user.email }}" name="sendfrom" />
  //       </div>
  //       <div class="form-group">
  //         To: <input id="compose-recipients" class="form-control" />
  //       </div>
  //       <div class="form-group">
  //         <input class="form-control" id="compose-subject" placeholder="Subject" />
  //       </div>
  //       <textarea class="form-control" id="compose-body" placeholder="Body"></textarea>
  //       <input onclick="submit_mails()" type="button" class="btn btn-primary" value="Submit" />
  //     </form>
  //   </div>
  // )
}

export default Compose;