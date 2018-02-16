import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import IndexedDBService from '../services/indexeddb.service';
import { ItemsActions } from '../reducers/items.reducer';
import { connect } from 'react-redux';
import  HomeComponent  from '../components/home.component';
import  CreateItemComponent  from '../components/operations/create-item.component';
import  EditComponent  from '../components/operations/edit.component';
import  ItemCommentsComponent  from '../components/operations/item-comments.component';

export class MainComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        IndexedDBService.GetAll((data) => {
            this.props.GetItems(data);
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

const mapDispatchToPropsMain = (dispatch) => ({
    GetItems: (items) => { dispatch(ItemsActions.SetItems(items)); },
});


export default connect(undefined, mapDispatchToPropsMain)(MainComponent);

