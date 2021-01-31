import React, { useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from 'App';


const Tr = styled.tr`
  text-align: center;
  &:nth-child(even) {
    background-color: #f2f2f2
  }
`

const Td = styled.td`
  box-sizing: border-box;
  border: 1px solid #ddd;
  padding: 8px;
`

const Remove = styled.div`
  color: #a92d4d;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: ${props => props.enabled ? 'pointer' : 'not-allowed'};

  & > span {
    margin: 0 10px;
  }
`

const KeyRow = ({keyObject, handleDeleteKey}) => {
  const { state } = React.useContext(AuthContext);
  const [enabledButton, setEnabledButton] = useState(true);
  const deleteKey = (event) => {
    setEnabledButton(false);

    fetch('http://localhost:5000/api/keys/remove', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': state.token
      },
      body: JSON.stringify({ key: keyObject.key }),
      mode: 'cors',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(resJson => {
        handleDeleteKey(keyObject)
      })
      .catch(err => console.log(err)); // Add error flashes
  }

  return (
    <Tr key={keyObject._id}>
      <Td>
        {keyObject.key}
      </Td>
      <Td>
        <div onClick={(e) => enabledButton && deleteKey(e)}>
          <Remove enabled={enabledButton}>
            Remove
            <span className="material-icons">
              remove_circle
            </span>
          </Remove>
        </div>
      </Td>
    </Tr>
  );
}

export default KeyRow;
