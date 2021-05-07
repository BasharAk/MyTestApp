import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { createSelector } from 'reselect';
import thunk from 'redux-thunk';
import axios from 'axios';

//INITIAL STATE

const INITIAL_LIST = {
  list: [],
  importing: false,
  imported: false,
  failed: false
};

const INITIAL_FILTERED_LIST = {
  filterWord: '',
  filteredList: []
};

//IMPORT ACTION (SIDE EFFECT)

export const importListThunk = () => async (dispatch) => {
  try {
    dispatch({ type: 'IMPORTING' });
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/restaurants`)
      .then((res) => {
        dispatch({ type: 'ADD_LIST', payload: res.data });
        dispatch({ type: 'IMPORTED' });
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    dispatch({ type: 'FAILED' });
  }
};

//REDUCERS

const listReducer = (state = INITIAL_LIST, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return { ...state, list: action.payload };
    case 'IMPORTING':
      return { ...state, importing: true };
    case 'IMPORTED':
      return { ...state, imported: true, importing: false, failed: false };
    case 'FAILED':
      return {
        ...state,
        imported: false,
        imporing: false,
        failed: true,
        list: []
      };
    default:
      return state;
  }
};

const filteredListReducer = (state = INITIAL_FILTERED_LIST, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER_WORD':
      return { ...state, filterWord: action.payload };
    case 'UPDATE_FILTERED_LIST':
      return { ...state, filteredList: action.payload };
    default:
      return state;
  }
};

//ADD THUNK MIDDLEWARE

const middleWares = applyMiddleware(thunk);

//COMBINE REDUCERS (CREATE ROOT REDUCER)

const rootReducer = combineReducers({
  listRes: listReducer,
  filteredList: filteredListReducer
});

//CREATE STORE
export const store = createStore(
  rootReducer,
  compose(
    middleWares
    //window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
  )
);

//AND FINALY CREATE MEMOLIZED SELECTORS ^_*

const selectList = (state) => state.listRes;
const selectFilteredList = (state) => state.filteredList;
export const getList = createSelector(selectList, (listRes) => listRes.list);
export const isImporting = createSelector(
  selectList,
  (listRes) => listRes.importing
);
export const isImported = createSelector(
  selectList,
  (listRes) => listRes.imported
);
export const isFailed = createSelector(selectList, (listRes) => listRes.failed);
export const getFilterWord = createSelector(
  selectFilteredList,
  (filteredList) => filteredList.filterWord
);

export const getFilteredList = createSelector(
  getList,
  getFilterWord,
  (list, filterWord) => {
    if (filterWord === '') {
      return list;
    } else {
      return list.filter(
        (item) =>
          item.restaurantName.toLowerCase().search(filterWord.toLowerCase()) >=
          0
      );
    }
  }
);
