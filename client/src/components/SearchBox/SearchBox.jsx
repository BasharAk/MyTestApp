import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { getFilterWord } from '../../redux';

const SearchBox = ({ styleOverwrite }) => {
  const dispatch = useDispatch();
  const filterWord = useSelector(getFilterWord);

  const onChangeHandler = (e) => {
    dispatch({
      type: 'UPDATE_FILTER_WORD',
      payload: e.target.value ? `${e.target.value}` : ''
    });
  };

  return (
    <div
      style={styleOverwrite ? styleOverwrite.wrapper : null}
      className='searchWrapper'
    >
      <div
        style={styleOverwrite ? styleOverwrite.input : null}
        className='searchContainer'
      >
        <div className='searchIconContainer'>
          <i className='fa fa-search searchIcon' />
        </div>
        <input
          type='text'
          className='searchInput '
          placeholder='Search Restaurant'
          value={filterWord}
          onChange={(e) => onChangeHandler(e)}
        />
      </div>
    </div>
  );
};

export default SearchBox;
