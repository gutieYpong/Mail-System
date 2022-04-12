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
        'recipients': recipient,
        'subject': subject,
        'body': body
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      .then( res => {
        setLoading( false );
        navigate('/sent');
      })
      .catch( err => {
        setLoading( false );
        setMessage( `Recipients: ${err.response.data.recipients.toString()}` );
      });
  };

  const recipientValidate = () => {

  }

  const formik = useFormik({
    initialValues: {
      mailRecipient: '',
      mailSubject: '',
      mailBody: '',
    },
    onSubmit: values => {
      const recipientArray = values.mailRecipient.split(",").map(item => item.trim());
      setLoading(true);
      handleSend(recipientArray, values.mailSubject, values.mailBody);
    },
    validationSchema: Yup.object({
      mailRecipient: Yup.string()
        // .email("errorMessages.PROVIDE_VALID_EMAIL")
        .required("Please provide recipient(s) email.")
        .test(
          "Mail Recipient",
          "Recipient(s) email not in right format.",
          (value) => {
            const re =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            const recipientArray = value.split(',').map(item => item.trim());

            for(let i = 0; i < recipientArray.length; i++) {
              if(!re.test(recipientArray[i].toLowerCase())) {
                return false
              }
            }
            return true
          },
        ),
      mailSubject: Yup.string().trim().required("* Subject is required."),
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
                name="mailRecipient"
                label="Recipient"
                type="text"
                id="mailRecipient"
                // autoComplete="current-password"
                {...formik.getFieldProps('mailRecipient')}
              />
              <TextField
                required
                fullWidth
                id="mailSubject"
                label="Subject"
                name="mailSubject"
                // autoComplete="subject"
                {...formik.getFieldProps('mailSubject')}
              />
              <TextField
                id="mailBody"
                name="mailBody"
                multiline
                fullWidth
                rows={6}
                placeholder="Click here to write..."
                sx={{ mt: 1 }}
                {...formik.getFieldProps('mailBody')}
              />
              <Box
                sx={{
                  mt: 1,
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left'
                  }}
                >
                  {
                    formik.touched.mailRecipient && formik.errors.mailRecipient &&
                    <Typography variant="body1" children={ formik.errors.mailRecipient } sx={{ textAlign: 'left' }} />
                  }
                  {
                    formik.touched.mailSubject && formik.errors.mailSubject &&
                    <Typography variant="body1" children={ formik.errors.mailSubject } 
                    sx={{ textAlign: 'left' }} />
                  }
                </Box>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  disabled={ loading }
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </RootContainer>
  )
}

export default Compose;