import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFilteredList } from '../../redux';

const Map = ({ refId, options, APIKey }) => {
  const filteredList = useSelector(getFilteredList);
  const divRef = useRef(refId);
  const [state, setState] = useState({
    markers: [],
    map: null
  });
  const { markers, map } = state;

  const createMarker = (position, map, title) => {
    return new window.google.maps.Marker({
      position: position,
      map: map,
      title: title
    });
  };

  const deleteMarkers = () => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setState({ ...state, markers: [] });
  };

  const updateMarkers = () => {
    deleteMarkers();
    setState({
      ...state,
      markers: filteredList.map(({ location, restaurantName }) =>
        createMarker(location, map, restaurantName)
      )
    });
  };

  //creates script element on dom
  const scriptLoader = () => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = `https://maps.google.com/maps/api/js?key=${APIKey}`;
    s.id = 'GoogleMaps';
    document.body.appendChild(s);
    s.addEventListener('load', (e) => {
      onScriptLoaded();
    });
  };

  // Runs after script loaded
  const onScriptLoaded = () => {
    setState({
      ...state,
      map: new window.google.maps.Map(divRef.current, {
        ...options,
        disableDefaultUI: true
      })
    });
  };

  /// Runs only on component mounted, making sure script is loaded
  useEffect(() => {
    if (!window.google) {
      scriptLoader();
    } else {
      onScriptLoaded();
    }
  }, []);

  //runs every time filter list or map created
  useEffect(() => {
    if (map) {
      updateMarkers();
    }
  }, [filteredList, map]);

  return (
    <>
      <div
        style={{ width: options.width, height: options.height }}
        ref={divRef}
      />
    </>
  );
};

export default Map;
