import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  color: rgba(0, 0, 0, 0.7);
  width: 100%;
  font-weight: 600;
`

const Input = styled.input`
  width: 100%;
  margin: 0.5rem 0 2rem;
  font-family: 'Monserrat', sans-serif;
`

const FieldContainer = styled.div`
  width: 100%;
`

const Field = ({label, fieldValue, setField, fieldType, fieldName}) => {
  const setValue = (event) => {
    fieldType === 'email' ?
      setField(event.target.value.toLowerCase()) :
      setField(event.target.value);

  }
  return (
    <FieldContainer>
      <Label>
        {label}
        <Input
          type={fieldType}
          name={fieldName}
          value={fieldValue}
          onChange={setValue}
        />
      </Label>
    </FieldContainer>
  );
}

export default Field;
