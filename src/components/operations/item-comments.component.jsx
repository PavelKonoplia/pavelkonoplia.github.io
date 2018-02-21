import * as React from 'react';
import IndexedDBService from '../../services/indexeddb.service';
import { getSelectedItem } from '../../reducers/items.reducer';
import { ItemsActions } from '../../reducers/items.reducer';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import '../main.component.css';
import '../home.component.css';
import './item-comments.component.css';

import config from '../../config.json';

class ItemCommentsComponent extends React.Component {

    item;
    constructor(props) {
        super(props);

        this.state = {
            addingComment: ''
        };

        this.addCommentToItem = this.addCommentToItem.bind(this);
        this.onChangeCommentValue = this.onChangeCommentValue.bind(this);
    }

    onChangeCommentValue(newValue) {
        this.setState(() => ({
            addingComment: newValue
        }));
    }

    addCommentToItem(event) {
        event.preventDefault();
        this.item.Comments = this.item.Comments.concat(this.state.addingComment);
        IndexedDBService.Update(this.item, (data) => {
            this.props.GetItems(data);
        });
        console.log("New comment added: " + this.state.addingComment);
        this.setState({
            addingComment: ''
        });

    }

    render() {
        let addPath = config.additionalUrl;
        let item = this.props.Item && this.props.Item.toJS();
        this.item = item;
        let renderComments = item && item.Comments.map((comment, index) =>
            <div key={index} className="item-no-hover">
                {comment}
            </div>
        );
        return (

            <div className="main">
                <div className="header-title">
                    <div className="title">
                        <Link
                            to={`${addPath}/`}
                            key={1}
                            className="button">&#8592;
                        </Link>
                        <div className="header-text">{item && item.Name}</div>
                    </div>
                </div>
                <div className="items-area">

                    <div className="item-container">
                        <div className="items-title">Current comments:</div>
                        {renderComments}
                    </div>
                    <div className="item-row">
                        <form onSubmit={this.addCommentToItem}>
                            <input
                                className="input-create"
                                type="text"
                                value={this.state.addingComment}
                                placeholder="New comment .."
                                onChange={e => this.onChangeCommentValue(e.target.value)}
                            />
                        </form>
                        <div className="button" onClick={this.addCommentToItem}>></div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToPropsItemComments = (state, ownProps) => ({
    Item: getSelectedItem(state, +ownProps.match.params.id)
});
const mapDispatchToPropsItemComments = (dispatch) => ({
    GetItems: (items) => { dispatch(ItemsActions.SetItems(items)); }
});

export default connect(mapStateToPropsItemComments, mapDispatchToPropsItemComments)(ItemCommentsComponent);
