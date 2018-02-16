import * as React from 'react';
import indexedDBService from '../../services/indexeddb.service';

import { ItemsActions } from '../../reducers/items.reducer';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";
class EditComponent extends React.Component {

    deleteItem(item) {
        indexedDBService.Delete(item);
    }

    render() {
        const items = this.props.Items.toJS();

        const renderItems = items.map((item, index) =>
            // tslint:disable-next-line:jsx-wrap-multiline 
            <div key={index}>
                {item.Name}
                <button onClick={() => this.deleteItem(item)}> Delete</button>
            </div >
        );
        return (
            <div>
                <Link
                    to={"/"}
                    key={1}>
                    <button>Home</button>
                </Link>
                {renderItems ? renderItems : undefined}
            </div>
        );
    }
}

const mapStateToPropsItems = (state) => ({
    Items: state.get('Items')
});

export default connect(mapStateToPropsItems, undefined)(EditComponent);
