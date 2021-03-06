import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from 'App';
import styled from 'styled-components'
import Sidebar from 'components/Sidebar';
import Field from 'components/Field';
import Button from 'components/Button';
import LoginImage from 'assets/undraw_secure_data_0rwp.svg';

const Container = styled.section`
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: row;
`

const LoginWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evently;
  margin: 0 auto;
  align-items: flex-start;
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
  align-self: center;
  width: 25%;
`;

const Title = styled.h1`
  color: rgba(0, 0, 0, 0.75);
  font-size: 1.5rem;
  margin-bottom: 3rem;
  font-family: 'Open Sans', sans-serif;
`;

const Subtitle = styled.h4`
  margin: 0;
  font-family: 'Open Sans', sans-serif;
  color: rgba(0, 0, 0, 0.65);
`

const Description = styled.p`
  margin-bottom: 2rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 300;
  font-size: 0.9rem;
  text-align: justify;
  text-justify: inter-word;
`

const Login = () => {
  const { dispatch } = React.useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const validFields = () => validEmail() && password.length;

  const handleFormSubmit = event => {
    if(!validFields) return;

    return fetch('http://localhost:5000/api/users/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(resJson => {
        dispatch({
          type: "LOGIN",
          payload: { token: resJson.token }
        })
      })
      .catch(err => console.log(err)); // Add error flashes
  }

  return (
    <Container>
      <Sidebar
        text='Nice to see you again!, Log in to access your API keys'
        image={LoginImage}
      />
      <LoginWrapper>
        <Title>Log in</Title>
        <Subtitle>Log in to your account.</Subtitle>
        <Description>
          By logging in you gain access to your dashboard, where you can request new API keys and disable current keys.
        </Description>
        <Field
          label='Email'
          fieldValue={email}
          setField={setEmail}
          fieldType='email'
          fieldName='email'
        />
        <Field
          label='Password'
          fieldValue={password}
          setField={setPassword}
          fieldType='password'
          fieldName='password'
        />
        <Button
          enabled={validFields()}
          onClick={handleFormSubmit}
          buttonText='Continue'
        />
        <Description>
          Don't have an account? Sign up <Link to='/signup'>here.</Link>
        </Description>
      </LoginWrapper>
    </Container> 
  );
}

export default Login
