import React, { useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from 'App';

const ExpandContainer = styled.div`
  cursor: pointer;
`

const Tr = styled.tr`
  text-align: center;
  &:nth-child(even) {
    background-color: #f2f2f2
  }
`

const Td = styled.td`
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-bottom: ${props => props.expanded ? 'none' : '1px solid #ddd'};
  padding: 8px;
`

const ExpandedTd = styled.td`
  box-shadow: inset 0 3px 6px -3px rgba(0, 0, 0, .2);
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-top: none;
`;

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

const ResponsesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Monserrat', sans-serif;
  align-items: flex-start;
  text-align: left;

  & > pre {
    margin: auto; 
    padding: 10px;
    width: min-content;
    border: 1px solid #ddd;
    background-color: #ededed;
    border-radius: 5px;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > h2 {
    font-family: 'Open Sans', sans-serif;
    color: #198580;
  }
`

const KeyRow = ({keyObject, handleDeleteKey}) => {
  const { state } = React.useContext(AuthContext);
  const [enabledButton, setEnabledButton] = useState(true);
  const [expanded, setExpanded] = useState(false);

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

  return [
    <Tr key={keyObject._id}>
      <Td expanded={expanded}>
        <ExpandContainer onClick={()=>{setExpanded(!expanded)}}>
          <span
            className="material-icons"
          >
            expand_more
          </span>
        </ExpandContainer>
      </Td>
      <Td expanded={expanded}>
        {keyObject.key}
      </Td>
      <Td expanded={expanded}>
        {keyObject.requestCount}
      </Td>
      <Td expanded={expanded}>
        <div onClick={(e) => enabledButton && deleteKey(e)}>
          <Remove enabled={enabledButton}>
            Remove
            <span className="material-icons">
              remove_circle
            </span>
          </Remove>
        </div>
      </Td>
    </Tr>,
    (expanded && <Tr key={`expanded-${keyObject._id}`}>
      <ExpandedTd colSpan={4} expanded={expanded}>
        <ResponsesContainer>
          <TextContainer>
            <h2>
              Requests:
            </h2>
            <p>
              { keyObject.requests.length === 0 ?
                  "This API key hasn't been used." :
                  "These are the requests that have been made using this key."
              }
            </p>
          </TextContainer>
          <pre>
            {
              JSON.stringify(keyObject.requests, null, 2)
            }
          </pre>
        </ResponsesContainer>
      </ExpandedTd>
    </Tr>)
  ];
}

export default KeyRow;
