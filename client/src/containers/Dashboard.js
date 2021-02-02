import React, { useState, useEffect } from 'react';
import { AuthContext } from 'App';
import styled from 'styled-components';
import Navbar from 'containers/Navbar';
import KeyRow from 'components/KeyRow';
import Button, { ButtonStyle } from 'components/Button';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 90%;
  font-family: 'Open Sans', sans-serif;

  & > ${ButtonStyle} > button {
    margin: 2rem auto 0;
    font-size: 1.25rem;
    width: 25%;
  }
`

const Table = styled.table`
  font-family: 'Monserrat', sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 2rem auto;
`

const Th = styled.th`
  border: 1px solid #fff;
  padding: 8px;
  color: #fff;
  background-color: #7b8ec2;
`

const Dashboard = () => {
  const { state } = React.useContext(AuthContext);

  const [data, setData] = useState([]);
  const [enableNewKey, setEnableNewKey] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/users/keys', {
      method: 'get',
      headers: {
        'Authorization': state.token,
      },
    })
      .then(res => {
        setEnableNewKey(true);

        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(resJson => {
        setData([
          ...resJson.keys
        ])
      })
      .catch(err => console.log(err)); // Add error flashes
  }, []);

  const requestNewKey = (event) => {
    event.stopPropagation();

    //disable button
    setEnableNewKey(false);

    return fetch('http://localhost:5000/api/keys/create', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': state.token
      },
      mode: 'cors',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(resJson => {
        setData([ ...data, resJson])
      })
      .catch(err => console.log(err)); // Add error flashes
  }

  const handleDeleteKey = (key) => {
    setData(
      data.filter(keyObject => keyObject._id !== key._id)
    );
  }

  const rows = data.map(key => (
    <KeyRow
      key={key._id}
      keyObject={key}
      handleDeleteKey={handleDeleteKey}
    />)
  );

  return (
    <div>
      <Navbar />
      <DashboardContainer>
        <Button
          buttonText='Generate new key'
          enabled={enableNewKey}
          onClick={requestNewKey}
          onComplete={() => setEnableNewKey(true)}
          color={"#00cea9"}
        />
        <Table>
          <thead>
            <tr>
              <Th>
              </Th>
              <Th>
                Key
              </Th>
              <Th>
                Number of requests
              </Th>
              <Th>
                Action
              </Th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </DashboardContainer>
    </div>
  );
}

export default Dashboard
