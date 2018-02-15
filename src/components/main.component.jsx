import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class MainComponent extends React.Component {
    Items;
    constructor(props) {
        super(props);

        this.getItems = this.getItems.bind(this);
    }

    getItems() {
        indexedDBService.GetAll((data) => {
            this.Items = data;
        });
    }

    componentWillUpdate() {
        this.getItems();
    }

    componentWillMount() {
        this.getItems();
    }


    render() {
        return (
             <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Main</Link>
                        </li>
                        <li>
                            <Link to="/create">Create new Item</Link>
                        </li>
                        <li>
                            <Link to="/edit">Edit Mode</Link>
                        </li>
                    </ul>

                    <hr />

                    <Route exact path="/" component={HomeComponent} />
                    <Route path="/create" component={CreateItemComponent} />
                    <Route path="/edit" component={EditComponent} />
                    <Route path="/item/:id" component={UpdateComponent} />
                </div>
            </Router>
        );
    }
}
