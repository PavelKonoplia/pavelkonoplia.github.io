import * as React from 'react';
import IndexedDBService from '../../services/indexeddb.service';
import { ItemsActions } from '../../reducers/items.reducer';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import '../main.component.css';

class CreateItemComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addingItemName: ''
        };

        this.onChangeAddValue = this.onChangeAddValue.bind(this);
        this.createItem = this.createItem.bind(this);
    }

    onChangeAddValue(newValue) {
        this.setState(() => ({
            addingItemName: newValue
        }));
    }

    createItem() {
        const item = {
            Id: this.props.Index + 1,
            Name: this.state.addingItemName,
            Comments: []
        };
        IndexedDBService.Create(item, (data) => { this.props.GetItems(data); });
        this.setState({
            addingItemName: ''
        });
    }

    render() {
        return (
            <div className="main">
                <div className="header-title">
                    <div className="title">
                        <Link
                            to={"/"}
                            key={1}
                            className="button">&#8592;
                        </Link>
                        <div className="header-text">Create new item</div>
                    </div>
                </div>
                <div className="items-area">
                    <div className="item-row">
                        <input
                            className="input-create"
                            type="text"
                            value={this.state.addingItemName}
                            placeholder="New item title .."
                            onChange={e => this.onChangeAddValue(e.target.value)}
                        />
                        <div className="button" onClick={this.createItem}>></div>
                    </div>
                </div>
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
});

export default connect(mapStateToPropsCreateItem, mapDispatchToPropsCreateItem)(CreateItemComponent);
