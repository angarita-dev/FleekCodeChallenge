import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import { AuthContext } from 'App';

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 70px;
  font-family: 'Open Sans', sans-serif;
  color: #fff;
  background-color: #005cb2;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
`

const Title = styled.h3`
  font-weight: 800;
`

const SignOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    margin: auto 0;
    width: auto;
  }
`

const Navbar = () => {
  const { dispatch } = React.useContext(AuthContext);

  const handleSignOut = () => (
    new Promise((resolve) => {
      resolve(dispatch({
        type: 'LOGOUT'
      }));
    })
  );

  return (
    <NavbarContainer>
      <Title>FleekChallenge</Title>
      <SignOutContainer>
        <Button
          enabled={true}
          buttonText='Sign out'
          onClick={handleSignOut}
        />
      </SignOutContainer>
    </NavbarContainer>
  );
};

export default Navbar;
