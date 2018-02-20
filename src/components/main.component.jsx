import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import IndexedDBService from '../services/indexeddb.service';
import { ItemsActions } from '../reducers/items.reducer';
import { connect } from 'react-redux';
import HomeComponent from '../components/home.component';
import CreateItemComponent from '../components/operations/create-item.component';
import ItemCommentsComponent from '../components/operations/item-comments.component';
import EventEmitter from '../common/event-emitter';
import './main.component.css';

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
        return (
            <Router>
                <div className="main-router">
                    <Route exact path="/" component={HomeComponent} />
                    <Route path="/create" component={CreateItemComponent} />
                    <Route path="/item/:id" component={ItemCommentsComponent} />
                </div>
            </Router>
        );
    }
}

const mapStateToPropsMain = (state) => ({
    Index: state.get('Index')
});

const mapDispatchToPropsMain = (dispatch) => ({
    GetItems: (items) => { dispatch(ItemsActions.SetItems(items)); }
});


export default connect(mapStateToPropsMain, mapDispatchToPropsMain)(MainComponent);

