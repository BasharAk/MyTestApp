import Map from '../components/Map/Map';
import SearchBox from '../components/SearchBox/SearchBox';
import { useSelector } from 'react-redux';
import { getFilteredList } from '../redux';

const mystyle = {
  wrapper: {
    position: 'fixed',
    top: '20px',
    left: '50vw',
    transform: `translate(${-50}%, ${0}px)`,
    zIndex: '10',
    width: `${window.innerWidth < 600 ? '60vw' : '30vw'}`
  },
  input: {
    backgroundColor: 'white'
  }
};

const GoogleMapPage = () => {
  const filtered = useSelector(getFilteredList);

  return (
    <div>
      <SearchBox styleOverwrite={mystyle} />
      <Map
        refId='myMap'
        APIKey='AIzaSyDnZHCNVuYH8lZSMZtuHzJ4677eUi6AE8w'
        options={{
          center: { lat: 25.25, lng: 55.5 },
          zoom: 9,
          width: '100vw',
          height: '100vh'
        }}
        markers={filtered}
      />
    </div>
  );
};

export default GoogleMapPage;
