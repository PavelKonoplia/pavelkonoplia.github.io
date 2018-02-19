import * as React from 'react';
import IndexedDBService from '../../services/indexeddb.service';
import { getSelectedItem } from '../../reducers/items.reducer';
import { ItemsActions } from '../../reducers/items.reducer';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class ItemCommentsComponent extends React.Component {

    item;    
    constructor(props) {
        super(props);

        this.state = {
            addingComment: ''
        };

        this.addCommentToItem = this.addCommentToItem.bind(this);

    }

    onChangeCommentValue(newValue) {
        this.setState(() => ({
            addingComment: newValue
        }));
    }

    addCommentToItem() {
        this.item.Comments=this.item.Comments.concat(this.state.addingComment);
        IndexedDBService.Update(this.item, (data) => {
            this.props.GetItems(data);
        });
    }

    render() {

        let item = this.props.Item && this.props.Item.toJS();
        this.item = item;
        let renderComments = item && item.Comments.map((comment, index) =>
            <div key={index}>
                {comment}
            </div>
        );
        return (
            <div>
                <Link
                    to={"/"}
                    key={1}>
                    <button>Home</button>
                </Link>                
                <div>{item && item.Name}</div>
                <div>Current comments</div>
                {renderComments}                
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
                    onChange={e => this.onChangeCommentValue(e.target.value)}
                />
                <button onClick={this.addCommentToItem}>Add comment</button>
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
