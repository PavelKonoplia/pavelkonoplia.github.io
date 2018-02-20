import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import indexedDBService from '../services/indexeddb.service';
import { ItemsActions } from '../reducers/items.reducer';

import './main.component.css';
import './home.component.css';

export class HomeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            deletingMode: false
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.changeDeleteMode = this.changeDeleteMode.bind(this);
    }

    deleteItem(item) {
        indexedDBService.Delete(item, (data) => {
            this.props.GetItems(data);
        });
    }

    changeDeleteMode() {
        this.setState({
            deletingMode: !this.state.deletingMode
        });
    }

    render() {
        const items = this.props.Items.toJS();
        const renderItems = items.map((item, index) =>
            <div key={index}
                className="item">
                <Link to={"/item/" + item.Id} className="link">
                    {item.Name}
                </Link>
                {this.state.deletingMode ? <div className="small-button" onClick={() => this.deleteItem(item)}>delete</div> : undefined}
            </div>
        );
        return (
            <div className="main">
                <div className="header-title">
                    <div className="title">
                        <Link
                            to={"/create"}
                            className="button navigation"
                            key={0}>+
                        </Link>
                        <div
                            onClick={this.changeDeleteMode}
                            className="button navigation"
                            key={1}>
                            &#8211;
                        </div>
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

