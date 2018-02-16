import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';

export class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const items = this.props.Items.toJS();

        const renderItems = items.map((item, index) =>
            <Link
                to={"/item/" + index}
                key={index}>
                <div>{item.Name}</div>
            </Link>
            // <div key={index} onClick={this.props.SelectItem(index)}>{item.Name}</div>
        );
        return (
            <div>
                <Link
                    to={"/create"}
                    key={0}>
                    Create Item
                    </Link>
                <Link
                    to={"/edit"}
                    key={1}>
                    Edit Mode
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

