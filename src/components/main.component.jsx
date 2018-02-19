import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import IndexedDBService from '../services/indexeddb.service';
import { ItemsActions } from '../reducers/items.reducer';
import { connect } from 'react-redux';
import HomeComponent from '../components/home.component';
import CreateItemComponent from '../components/operations/create-item.component';
import EditComponent from '../components/operations/edit.component';
import ItemCommentsComponent from '../components/operations/item-comments.component';
import EventEmitter from '../common/event-emitter';


class MainComponent extends React.Component {

    componentWillMount() {
        
        let setItems = (data) => this.props.GetItems(data);
        let setIndex = (value) => this.props.GetIndex(value);

        EventEmitter.subscribe('initialized', function (e) {
            IndexedDBService.GetAll((data) => {
                setItems(data);
            });
            IndexedDBService.GetIndex((index) => {
                let value = index ?
                    (index[0] >= 1 ? index[0] : 0)
                    : 0;
                setIndex(value);
            });
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={HomeComponent} />
                    <Route path="/create" component={CreateItemComponent} />
                    <Route path="/edit" component={EditComponent} />
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
    GetItems: (items) => { dispatch(ItemsActions.SetItems(items)); },
    GetIndex: (index) => { dispatch(ItemsActions.SetLastIndex(index)); },
});


export default connect(mapStateToPropsMain, mapDispatchToPropsMain)(MainComponent);

