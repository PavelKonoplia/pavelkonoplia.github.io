import { createAction, handleActions } from 'redux-actions';
import { List, fromJS, Record } from 'immutable';

const ItemsActionTypes = {
    SetItems: 'SET_ITEMS',
    SetLastIndex: 'SET_ITEMS_INDEX'
};

const SetItems = createAction(
    ItemsActionTypes.SetItems,
    (items) => fromJS(items.map(item => fromJS(item)))
);
const SetLastIndex = createAction(
    ItemsActionTypes.SetLastIndex,
    (id) => id
);

export const ItemsActions = { SetItems, SetLastIndex };

// State
export class ItemsReducerState extends Record({ Items: List(), Index: {} }) { }

// Reducer
const ItemsReducer = handleActions(
    {
        [ItemsActionTypes.SetItems]: (state, action) => {
            return state.set('Items', action.payload);
        }, 
        [ItemsActionTypes.SetLastIndex]: (state, action) => {
            return state.set('Index', action.payload);
        },
    },
    new ItemsReducerState()
);

export default ItemsReducer;

export const getSelectedItem = (state, itemId) => {
    debugger
    return state.get('Items').find((item) => item.get('Id') === itemId);
}