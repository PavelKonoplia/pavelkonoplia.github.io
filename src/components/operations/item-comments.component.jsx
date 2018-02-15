import * as React from 'react';
import indexedDBService from '../../services/indexeddb.service';

class ItemCommentsComponent extends React.Component {

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
        //add comment logic
    }

    render() {
        const renderComments = this.item.Comments.map((comment, index) =>
            <div key={index}>{comment}</div >
        );
        return (
            <div>
                <div>{this.props.Item.Name}</div>
                {renderComments ? { renderComments }
                    : undefined}
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

export default ItemCommentsComponent;
