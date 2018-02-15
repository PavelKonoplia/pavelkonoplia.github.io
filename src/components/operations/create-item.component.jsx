import * as React from 'react';
import indexedDBService from '../../services/indexeddb.service';
import { ItemsReducerState } from '../../reducers/items.reducer';
import { ItemsActions } from '../../reducers/items.reducer';

import { connect } from 'react-redux';

class CreateItemComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addingItemName: ''
        };
        this.onChangeAddValue = this.onChangeAddValue.bind(this);
        this.CreateItem = this.CreateItem.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    onChangeAddValue(newValue) {
        this.setState(() => ({
            addingItemName: newValue
        }));
    }

    CreateItem() {
        const item = {
            Name: this.state.addingItemName,
            Comments: []
        };
        indexedDBService.Create(item);
    }
    /*
        getItem() {
            indexedDBService.Get(2,(data) => {
                console.log(data);
            });
        }
    */
    getItems() {
        /*
        
        indexedDBService.GetAll((data) => {
            console.log(data);
        });*/
        
        // indexedDBService.GetAll((data) => {
        //     ItemsActions.SetItems(data);
        //     console.log(ItemsActions.SetItems(data));
        // });
        this.props.GetItems();
       // console.log(ItemsReducer.get('Items'));
        //console.log('d ' + this.props.Items + ' b');
    }

    componentWillMount() {

        indexedDBService.GetAll((data) => {
            ItemsActions.SetItems(data);
             console.log(data);
             console.log(ItemsActions.SetItems(data));
        });

    }


    render() {
        return (
            <div>
                <button>Back</button>
                <form onSubmit={this.addItem}>
                    <input
                        className="focused gray-placeholder"
                        type="text"
                        style={{
                            border: `1px solid #DFDFDF`,
                            width: `calc`,
                            height: '20px',
                            margin: '0',
                            padding: '5px 35px 5px 13px',
                            paddingLeft: '13px',
                            paddingRight: '13px',
                            fontFamily: 'Roboto-Regular',
                            fontSize: '14px',
                            backgroundColor: 'white'
                        }}
                        onChange={e => this.onChangeAddValue(e.target.value)}
                    />
                </form>
                <button onClick={this.CreateItem}>Add</button>
                <button onClick={this.getItem}>Get</button>
                <button onClick={this.GetItems}>GetAll</button>
            </div>
        );
    }
}

const mapStateToPropsItems = (state) => ({
    Items: state.get('Items')
});

const mapDispatchToPropsCompetencyGroup = (dispatch) => ({
    GetItems: () => { dispatch(ItemsActions.SetItems()); },
    /* UpdateItem: (id: number, name: string) => { dispatch(ItemsActions.Update(id, name)); },
    DeleteItem: (item) => { dispatch(ItemsActions.Delete(item)); },
    Back: (item) => {
        dispatch(push(`/`));
    }
    */
});


export default connect(mapStateToPropsItems, mapDispatchToPropsCompetencyGroup)(CreateItemComponent);
