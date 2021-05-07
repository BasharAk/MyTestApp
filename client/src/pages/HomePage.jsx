import SearchBox from '../components/SearchBox/SearchBox';
import RestaurantCard from '../components/RestaurantCard/RestaurantCard';
import { useSelector } from 'react-redux';
import { getFilteredList, isFailed, isImporting, isImported } from '../redux';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography/Typography';
import Box from '@material-ui/core/Box/Box';

const HomePage = () => {
  const filtered = useSelector(getFilteredList);
  const failed = useSelector(isFailed);
  const importing = useSelector(isImporting);
  const imported = useSelector(isImported);
  const history = useHistory();

  return (
    <>
      <Box my={2}>
        <SearchBox />
      </Box>
      <Box my={2} onClick={() => history.push('/map')}>
        <img
          src={'https://www.shisheo.com/assets/front/images/logo.png'}
          alt={'HomePage'}
        />
      </Box>
      {failed ? (
        <Typography>Loading Failed</Typography>
      ) : importing ? (
        <Box
          height={'50vh'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <CircularProgress size={50} />
        </Box>
      ) : imported && filtered.length > 0 ? (
        <Grid container spacing={4}>
          {filtered.map((item) => (
            <Grid item xs={12} md={4} key={item._id}>
              <RestaurantCard key={item._id} {...item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography> No Items Found</Typography>
      )}
    </>
  );
};

export default HomePage;
