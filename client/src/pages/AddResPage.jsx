import { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import Box from '@material-ui/core/Box/Box';
import { Grid } from '@material-ui/core';

const AddResPage = () => {
  const [state, setState] = useState({
    restaurantName: 'Crisol Restaurant and Lounge',
    img: 'crisol',
    tags: 'Arabic, Lebanese, Chinese',
    delCosts: 6,
    offer: 20,
    classN: 4,
    delTime: 25,
    payment: 'Cash-On-Delivery',
    location: { lat: 25.19554092044014, lng: 55.40833033013766 }
  });

  const onChangeHandeler = (e, ind) => {
    if (ind === 'lat' || ind === 'lng')
      setState((state) => ({
        ...state,
        location: { ...state.location, [ind]: e.target.value }
      }));
    else setState((state) => ({ ...state, [ind]: `${e.target.value}` }));
  };

  return (
    <Box my={2}>
      <Grid container spacing={2}>
        {[
          'restaurantName',
          'img',
          'tags',
          'delCosts',
          'offer',
          'classN',
          'delTime',
          'payment',
          'lat',
          'lng'
        ].map((ind) => {
          return (
            <Grid item xs={12} md={4}>
              <Box>
                <TextField
                  fullWidth
                  id='outlined-basic'
                  label={ind}
                  variant='outlined'
                  key={ind}
                  type={'text'}
                  value={
                    ind === 'lat' || ind === 'lng'
                      ? state.location[ind]
                      : state[ind]
                  }
                  onChange={(e) => onChangeHandeler(e, ind)}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Box
        my={2}
        textAlign={'center'} /*display={'flex'} justifyContent={'center'}*/
      >
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            axios({
              method: 'post',
              url: 'http://192.168.0.128:3001/restaurants',
              data: state
            }).then((res) => console.log(res.status));
          }}
        >
          post
        </Button>
      </Box>
    </Box>
  );
};

export default AddResPage;
