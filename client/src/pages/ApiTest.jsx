import axios from 'axios';
import { useState } from 'react';
import Button from '@material-ui/core/Button/Button';

const reg = async (setToken) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/users/reg`,
      {
        userName: 'Bashar',
        password: '123123123',
        email: 'bashar@hotmail.com'
      }
    );
    console.log(res.data);
    setToken(res.data.token);
  } catch (error) {
    console.log(error.response.statusText);
    console.log(error.response.status);
  }
};

const login = async (setToken) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/users/login`,
      {
        userName: 'Bashar',
        password: '123123123',
        email: 'bashar@hotmail.com'
      }
    );
    console.log(res.data);
    setToken(res.data.token);
  } catch (error) {
    console.log(error.response.statusText);
    console.log(error.response.status);
  }
};

const prot = async (token) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/protected`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error.response.statusText);
    console.log(error.response.status);
  }
};

const logout = async (token, setToken, all) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/users/logout`,
      { all: all },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setToken('');
    console.log(res.statusText);
  } catch (error) {
    console.log(error.response.statusText);
    console.log(error.response.status);
  }
};

const upload = async (e) => {
  e.preventDefault();
  const file = e.target.fileup1.files[0];
  //const files = [e.target.fileup1.files[0], e.target.fileup2.files[0]];
  const formData = new FormData();
  formData.append('upload', file);
  //files.forEach((file) => formData.append('upload', file));
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    console.log(res.statusText);
  } catch (error) {
    console.log(error.response.statusText);
    console.log(error.response.status);
  }
};

export const ApiTest = () => {
  const [token, setToken] = useState({});
  return (
    <>
      <Button
        variant='contained'
        color='primary'
        onClick={() => login(setToken)}
      >
        Login
      </Button>
      <Button variant='contained' color='primary' onClick={() => reg(setToken)}>
        Register
      </Button>
      <Button
        variant='contained'
        color='primary'
        onClick={() => logout(token, setToken)}
      >
        Logout
      </Button>
      <Button
        variant='contained'
        color='primary'
        onClick={() => logout(token, setToken, true)}
      >
        LogoutAll
      </Button>
      <Button variant='contained' color='primary' onClick={() => prot(token)}>
        Protected!!
      </Button>
      <Button
        variant='contained'
        color='primary'
        onClick={() => console.log(token)}
      >
        Log Token
      </Button>
      <div>
        <form
          onSubmit={(e) => upload(e)}
          id='uploadForm'
          action='upload_file'
          role='form'
          method='post'
          encType='multipart/form-data' // very important
        >
          <input type='file' name='fileup1' />
          {/* <input type='file' name='fileup2' /> */}

          <input type='submit' value='Upload' />
        </form>
      </div>
    </>
  );
};
