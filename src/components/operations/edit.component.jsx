import * as React from 'react';
import indexedDBService from '../../services/indexeddb.service';

class EditComponent extends React.Component {

    deleteItem(item) {
        indexedDBService.Delete(item);
    }

    render() {
        const renderItems = this.props.Items.map((item, index) =>
            // tslint:disable-next-line:jsx-wrap-multiline 
            <div key={index}>{item.Name}
                <button onClick={() => this.deleteItem(item)}> Delete</button>
            </div >
        );
        return (
            <div>                
                <button>Back</button>
                {renderItems ? renderItems.length
                    ? { renderItems }
                    : <div className="">There are no items.</div>
                    : undefined}
            </div>
        );
    }
}

const mapStateToPropsItems = () => ({
    Items: ItemsReducerState.get('Items')
});

export default connect(mapStateToPropsItems, undefined)(CreateItemComponent);
