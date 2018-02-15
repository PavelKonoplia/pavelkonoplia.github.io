import { createAction, handleActions } from 'redux-actions';
import { List, fromJS, Record } from 'immutable';


const ItemsActionTypes = {
    SetItems: 'SET_ITEMS'
};

// Action Creators
// const SetItems = createAction(
//     ItemsActionTypes.SetItems,
//     (items) => items
// );
const SetItems = createAction(
    ItemsActionTypes.SetItems,
    (items) => fromJS(items.map(item => fromJS(item)))
);

export const ItemsActions = { SetItems };

// State
export class ItemsReducerState extends Record({ Items: List() }) { }

// Reducer
const ItemsReducer = handleActions(
    {
        [ItemsActionTypes.SetItems]: (state, action) => {
            debugger
            return state.set('Items', action.payload);
        },
    },
    new ItemsReducerState
);

export default ItemsReducer;
