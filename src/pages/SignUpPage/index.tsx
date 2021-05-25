import React from 'react';
import styled from 'styled-components/macro';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { useAuth } from '../../auth/AuthProvider';
import { useHistory } from 'react-router-dom';

export type SignUpPageComponentProps = {
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Paper = styled.div`
  margin-top: ${(props) => props.theme.spacing(8)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  margin-top: ${(props) => props.theme.spacing(1)}px;
`;

const SubmitButton = styled(Button)`
  margin: ${(props) => props.theme.spacing(3, 0, 2)};
`;

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">Leteto</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export const SignUpPageComponent: React.FC<SignUpPageComponentProps> = (
  props
) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        <img
          src="/static/Leteto.svg"
          alt="leteto"
          title="leteto レテト"
          width="50%"
          height="100%"
        ></img>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Form onSubmit={props.handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password1"
            label="Password"
            type="password"
            id="password1"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Password Again"
            type="password"
            id="password2"
            autoComplete="current-password"
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </SubmitButton>
          <Grid container justify="center">
            <Grid item>
              <Link href="#" variant="body2">
                {'If you have an account. Sign In'}
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export const SignUpPage: React.FC = () => {
  const auth = useAuth();
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = event.currentTarget.elements.namedItem(
      'username'
    ) as HTMLInputElement;
    const email = event.currentTarget.elements.namedItem(
      'email'
    ) as HTMLInputElement;
    const password1 = event.currentTarget.elements.namedItem(
      'password1'
    ) as HTMLInputElement;
    const password2 = event.currentTarget.elements.namedItem(
      'password2'
    ) as HTMLInputElement;
    await auth.signup(
      username.value,
      email.value,
      password1.value,
      password2.value,
      history
    );
  };

  return (
    <SignUpPageComponent
      handleSubmit={(e) => handleSubmit(e)}
    ></SignUpPageComponent>
  );
};
