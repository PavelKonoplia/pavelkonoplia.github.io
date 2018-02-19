import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

export class HomeComponent extends React.Component {

    render() {
        const items = this.props.Items.toJS();


        const renderItems = items.map((item, index) =>
            <Link
                to={"/item/" + ++index}
                key={index}>
                <div>{item.Name}</div>
            </Link>
        );
        return (
            <div>
                <Link
                    to={"/create"}
                    key={0}>
                    <button>Create Item</button>
                </Link>
                <Link
                    to={"/edit"}
                    key={1}>
                    <button>Edit Mode</button>
                </Link>
                {renderItems}
            </div>
        );
    }
}

const mapStateToPropsHome = (state) => ({
    Items: state.get('Items')
});


export default connect(mapStateToPropsHome, undefined)(HomeComponent);

