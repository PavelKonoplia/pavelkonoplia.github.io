import React from "react";
import { BrowserRouter as Route } from "react-router-dom";
import IndexedDBService from '../services/indexeddb.service';
import { ItemsActions } from '../reducers/items.reducer';
import { connect } from 'react-redux';
import HomeComponent from '../components/home.component';
import CreateItemComponent from '../components/operations/create-item.component';
import ItemCommentsComponent from '../components/operations/item-comments.component';
import EventEmitter from '../common/event-emitter';

import { withRouter } from 'react-router';
import './main.component.css';

import config from '../config.json';

class MainComponent extends React.Component {

    componentWillMount() {
        let setItems = (data) => this.props.GetItems(data);

        EventEmitter.subscribe('initialized', function (e) {
            IndexedDBService.GetAll((data) => {
                setItems(data);
            });
        });
    }

    render() {
        let addPath = config.additionalUrl;
        return (
            <div className="main-router">
                <Route exact path={`${addPath}/`} component={HomeComponent} />
                <Route path={`${addPath}/create`} component={CreateItemComponent} />
                <Route path={`${addPath}/item/:id`} component={ItemCommentsComponent} />
            </div>
        );
    }
}

const mapStateToPropsMain = (state) => ({
    Index: state.get('Index')
});

const mapDispatchToPropsMain = (dispatch) => ({
    GetItems: (items) => { dispatch(ItemsActions.SetItems(items)); }
});


export default withRouter(connect(mapStateToPropsMain, mapDispatchToPropsMain)(MainComponent));

