import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { importListThunk } from './redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GoogleMapPage from './pages/GoogleMapPage';
import AddResPage from './pages/AddResPage';
import { ApiTest } from './pages/ApiTest';
import Container from '@material-ui/core/Container/Container';

const App = () => {
  const dispatch = useDispatch();
  const imported = useSelector((state) => state.imported);
  useEffect(() => {
    if (!imported) {
      dispatch(importListThunk());
    }
  }, [dispatch]);

  return (
    <div>
      <Container>
        <Switch>
          <Route path={'/map'} render={() => <GoogleMapPage />} exact />
          <Route path={'/'} render={() => <HomePage />} exact />
          <Route path={'/ares'} render={() => <AddResPage />} exact />
          <Route path={'/apipage'} render={() => <ApiTest />} exact />
          <Redirect to={'/'} /> {/* redirect to home page */}
        </Switch>
      </Container>
    </div>
  );
};

export default App;
