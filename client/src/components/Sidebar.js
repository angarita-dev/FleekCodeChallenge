import React from 'react'
import styled from 'styled-components'

const SidebarContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 50px;
  box-sizing: border-box;
  background-color: #005cb2;
  width: 45%;
`;

const Text = styled.h1`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.75rem;
  word-wrap: wrap;
  width: 90%;
  color: #fff;
`;

const Image = styled.img`
  width: 80%;
`

const Sidebar = ({ text, image }) => {
  return (
    <SidebarContainer>
      <Text>
        { text }
      </Text>
      <Image src={image}/>
    </SidebarContainer>
  );
}

export default Sidebar;
