import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import indexedDBService from '../services/indexeddb.service';
import { ItemsActions } from '../reducers/items.reducer';

import './main.component.css';
import './home.component.css';

import config from '../config.json';

export class HomeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(item) {
        indexedDBService.Delete(item, (data) => {
            this.props.GetItems(data);
        });
    }

    render() {
        let addPath = config.additionalUrl;
        const items = this.props.Items.toJS();
        const renderItems = items.map((item, index) =>
            <div key={index}>
                <div className="item">
                    <Link to={`${addPath}/item/` + item.Id} className="link">
                        {item.Name}
                    </Link>
                    <div className="small-button" onClick={() => this.deleteItem(item)}>delete</div>
                </div>
            </div>
        );
        return (
            <div className="main">
                <div className="header-title">
                    <div className="title">
                        <Link
                            to={`${addPath}/create`}
                            className="button"
                            key={0}>+
                            </Link>
                        <div className="header-text">Items observer</div>
                    </div>
                </div>
                <div className="items-area">
                    <div className="item-container">
                        <div className="items-title">Current items:</div>
                        {renderItems}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToPropsHome = (state) => ({
    Items: state.get('Items')
});

const mapDispatchToPropsHome = (dispatch) => ({
    GetItems: (items) => { dispatch(ItemsActions.SetItems(items)); }
});

export default connect(mapStateToPropsHome, mapDispatchToPropsHome)(HomeComponent);

