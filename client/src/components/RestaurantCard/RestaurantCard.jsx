import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box/Box';


const rating = (rate) => {
  let b = [];
  for (let i = 0; i < rate; i++) {
    b.push(<i className='fa fa-star rating' key={i} />);
  }
  return b;
};

const useStyles = makeStyles((theme) => ({
  media: {
    height: '300px',
    marginBottom: '10px',
    top: 0,
    borderRadius: '15px'
  },
  name: {
    fontWeight: 700,
    fontSize: '1.2rem'
  },
  rating: {
    color: 'yellow'
  }
}));

const RestaurantCard = (props) => {
  const {
    id,
    restaurantName,
    classN,
    delCosts,
    delTime,
    img,
    offer,
    payment,
    tags
  } = props;

  const classes = useStyles();
  return (
    <Card elevation={5}>
      <CardContent>
        <CardMedia
          className={classes.media}
          image={`${process.env.REACT_APP_SERVER_URL.replace(
            'api',
            ''
          )}/images/${img}.jpg`}
          title={restaurantName}
        />
        <Box>
          <Grid container direction={'row'} justify={'space-between'}>
            <Typography className={classes.name}>{restaurantName}</Typography>
            <Typography className={classes.rating}>
              {rating(classN, id)}
            </Typography>
          </Grid>
          <Grid
            container
            direction={'row'}
            justify={'space-between'}
            wrap={'nowrap'}
          >
            <Typography align='left'>{tags}</Typography>
            <Typography align='right'>{`Deliver with ${delTime} min`}</Typography>
          </Grid>
          <Grid container direction={'row'} justify={'space-between'}>
            <Typography>{`Delivery: AED ${delCosts}`}</Typography>
            <Typography>{payment}</Typography>
          </Grid>
          <Typography
            align={'left'}
          >{`${offer}% Off Selected Items`}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
export default RestaurantCard;
