import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  width: 100%;

  & > button {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    cursor: ${props => props.enabled ? 'pointer' : 'not-allowed'};
    border-radius: 4px;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
    background-color: ${props => props.enabled ? props.color : '#fff'};
    color: ${props => props.enabled ? '#fff' : props.color};
    border: 2px solid ${props => props.color};
    transition: all 0.5s ease-in-out;
  }
`

const Button = ({ enabled, buttonText, onClick, onComplete=()=>{}, color="#005cb2" }) => {
  const handleClick = (event) => {
    event.preventDefault();

    if(!enabled) return;

    onClick(event)
    .then(result => onComplete());
  }

  return (
    <ButtonContainer enabled={enabled} color={color}>
      <button onClick={handleClick}>
        { buttonText }
      </button>
    </ButtonContainer>
  );
}

export default Button;
export { ButtonContainer as ButtonStyle };
