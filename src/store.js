// store.js
import { createStore } from 'redux';

const initialState = {
  contacts: [],
  contactToEdit: null,
  searchValue: '',
  filterValue: 'all',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload,
      };
    case 'SET_FILTER_VALUE':
      return {
        ...state,
        filterValue: action.payload,
      };
    case 'SET_CONTACT_TO_EDIT':
      return {
        ...state,
        contactToEdit: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
