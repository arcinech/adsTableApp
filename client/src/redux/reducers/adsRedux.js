import { API_URL } from '../../config';

export const getAds = ({ ads }) => ads.data;
export const getRequest = ({ ads }) => ads.requests;
export const getAdById = ({ ads }, id) => ads.data.filter(ad => ad.id === id);
export const getSearchResult = ({ ads }) => ads.search;
/* ACTIONS */

// action name creator
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const DELETE_AD = createActionName('DELETE_AD');
const SEARCH_ADS = createActionName('SEARCH_ADS');

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const addAd = payload => ({ payload, type: ADD_AD });
export const loadAds = payload => ({ payload, type: LOAD_ADS });
export const editAd = payload => ({ payload, type: EDIT_AD });
export const deleteAd = payload => ({ payload, type: DELETE_AD });
export const searchAds = payload => ({ payload, type: SEARCH_ADS });

/* THUNKS */

export const loadAdsRequest = () => {
  return async dispatch => {
    dispatch(startRequest({ name: 'LOAD_ADS' }));
    try {
      const options = {
        method: 'GET',
      };
      const res = await fetch(`${API_URL}/api/ads`, options);
      const json = await res.json();
      dispatch(loadAds(json));
      dispatch(endRequest({ name: 'LOAD_ADS' }));
    } catch (err) {
      dispatch(errorRequest({ name: 'LOAD_ADS', error: err.message }));
    }
  };
};

export const addAdsRequest = ad => {
  return async dispatch => {
    dispatch(startRequest({ name: 'ADD_AD' }));

    try {
      console.log(...ad);
      const options = {
        method: 'POST',
        body: ad,
        credentials: 'include',
      };
      const res = await fetch(`${API_URL}/api/ads`, options);
      const json = await res.json();
      dispatch(addAd(json));
      dispatch(endRequest({ name: 'ADD_AD' }));
    } catch (err) {
      dispatch(errorRequest({ name: 'ADD_AD', error: err.message }));
    }
  };
};

export const editAdsRequest = (ad, id) => {
  return async dispatch => {
    dispatch(startRequest({ name: 'ADD_AD' }));

    try {
      const options = {
        method: 'PUT',
        body: ad,
        credentials: 'include',
      };

      const res = await fetch(`${API_URL}/api/ads/${id}`, options);
      const json = await res.json();
      dispatch(editAd(json));
      dispatch(endRequest({ name: 'ADD_AD' }));
    } catch (err) {
      dispatch(errorRequest({ name: 'ADD_AD', error: err.message }));
    }
  };
};

export const deleteAdsRequest = id => {
  return async dispatch => {
    dispatch(startRequest({ name: 'ADD_AD' }));
    try {
      const options = {
        method: 'DELETE',
        credentials: 'include',
      };
      const res = await fetch.delete(`${API_URL}/api/ads/${id}`, options);
      const json = res.json();
      dispatch(deleteAd(json));
      dispatch(endRequest({ name: 'ADD_AD' }));
    } catch (err) {
      dispatch(errorRequest({ name: 'ADD_AD', error: err.message }));
    }
  };
};

export const searchAdsRequest = search => {
  return async dispatch => {
    dispatch(startRequest({ name: 'SEARCH_ADS' }));
    try {
      const options = {
        method: 'GET',
      };
      const res = await fetch(`${API_URL}/api/ads/search/${search}`, options);
      const json = await res.json();
      dispatch(searchAds(json));
      dispatch(endRequest({ name: 'SEARCH_ADS' }));
    } catch (err) {
      dispatch(errorRequest({ name: 'SEARCH_ADS', error: err.message }));
    }
  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
  requests: {},
};

/* REDUCER */

const adsReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case LOAD_ADS:
      return { ...statePart, data: [...action.payload] };
    case ADD_AD:
      return { ...statePart, data: [...statePart.ads, action.payload] };
    case EDIT_AD:
      return statePart.map(ad => (ad._id === action.payload.id ? action.payload : ad));
    case DELETE_AD:
      return statePart.filter(ad => ad._id !== action.payload.id);
    case SEARCH_ADS:
      return { ...statePart, search: [...action.payload] };
    case START_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: true, error: null, success: false },
        },
      };
    case END_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: false, error: null, success: true },
        },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            pending: false,
            error: action.payload.error,
            success: false,
          },
        },
      };
    default:
      return statePart;
  }
};

export default adsReducer;
