import * as React from 'react';
import IndexedDBService from '../../services/indexeddb.service';
import { ItemsActions } from '../../reducers/items.reducer';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class CreateItemComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addingItemName: ''
        };

        this.onChangeAddValue = this.onChangeAddValue.bind(this);
        this.createItem = this.createItem.bind(this);
        this.setIndexAndCreate = this.setIndexAndCreate.bind(this);
    }

    onChangeAddValue(newValue) {
        this.setState(() => ({
            addingItemName: newValue
        }));
    }

    setIndexAndCreate(callback) {
        let index = this.props.Index + 1;
        this.props.SetIndex(index);
        callback(index);
    }

    createItem() {
        this.setIndexAndCreate((index) => {
            const item = {
                Id: index,
                Name: this.state.addingItemName,
                Comments: []
            };
            IndexedDBService.Create(item, (data) => { this.props.GetItems(data); });
        });
    }

    render() {
        return (
            <div>
                <Link
                    to={"/"}
                    key={1}>
                    <button>Home</button>
                </Link>
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
                <button onClick={this.createItem}>Add</button>
            </div>
        );
    }
}

const mapStateToPropsCreateItem = (state) => ({
    Items: state.get('Items'),
    Index: state.get('Index')
});

const mapDispatchToPropsCreateItem = (dispatch) => ({
    GetItems: (items) => { dispatch(ItemsActions.SetItems(items)); },
    SetIndex: (index) => { dispatch(ItemsActions.SetLastIndex(index)); },
});

export default connect(mapStateToPropsCreateItem, mapDispatchToPropsCreateItem)(CreateItemComponent);
