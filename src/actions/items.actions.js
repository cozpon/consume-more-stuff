import Axios from 'axios';

const listOfItems = '/api/items'; // URL to POST to

export const LOAD_SINGLE_ITEM = 'LOAD_SINGLE_ITEM';
export const LOAD_ITEMS = 'LOAD_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const EDITING ='EDITING';
export const ITEM_SOLD ='ITEM_SOLD';
export const DEL_ITEM ='DEL_ITEM';
export const ERROR = 'ERROR';

//GET single item
export const loadSingleItem = (id) => {
  console.log(id);
  return(dispatch) => {
    return Axios.get(listOfItems + `/` + id)
    .then(item => {
      dispatch({
        type: LOAD_SINGLE_ITEM,
        item: item.data
      });
    });
  };
};

//GET all items
export const loadItems = () => {
  return (dispatch) => {
    return Axios.get(listOfItems)
    .then(items => {
      dispatch({
        type: LOAD_ITEMS,
        items: items.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

//CREATE(POST) new item
export const addItem = (newItem) => {
  return (dispatch) => {
    return Axios.post(listOfItems, newItem)
    .then(newItemDetails => {
      dispatch({
        type: ADD_ITEM,
        newItem: newItemDetails.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

//Switches flag to inform front end of change/edit
export const makeItemEditable = (id, editing) => {
  return (dispatch) => {
    return dispatch({
      type: EDITING,
      id: id,
      editing: editing
    });
  };
};

//UPDATE(PUT) item
export const editItem = (updatedItem) => {
  return (dispatch) => {
    return Axios.put(`${listOfItems}/${updatedItem.id}`, updatedItem)
    .then(updatedItemDetails => {
      dispatch({
        type: EDIT_ITEM,
        updatedItem: updatedItemDetails.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const setItemToSold = (itemId) => {
  return dispatch => {
    return Axios.put((`${listOfItems}/${itemId}/sold`))
    .then(soldItemDetails => {
      dispatch ({
        type : ITEM_SOLD,
        soldItem : soldItemDetails.data
      });
    })
    .catch(err => {
      dispatch({
        type : ERROR,
        error : err
      });
    });
  };
};

export const deleteItem = (itemId) => {
  return dispatch => {
    return Axios.delete(`${listOfItems}/${itemId}`)
    .then(response => {
      dispatch({
        type : DEL_ITEM,
        id : itemId
      });
    })
    .catch(err => {
      dispatch({
        type : ERROR,
        error : err
      });
    });
  };
};