import React from "react";
import Pagination from "./Pagination";

class App extends React.Component {
  constructor() {
    super();

    // an example array of items to be paged
    var exampleItems = [...Array(20).keys()].map((i) => ({
      id: i + 1,
      name: "Item " + (i + 1),
    }));

    this.state = {
      exampleItems: exampleItems,
      pageOfItems: [],
      pageSize: 5,
    };
  }

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  };

  removeItems = () => {
    this.setState((i) => ({
      exampleItems: i.exampleItems.splice(0, i.exampleItems.length - 3),
    }));
  };

  addItems = () => {
    this.setState((i) => ({
      exampleItems: [...Array(20).keys()].map((i) => ({
        id: i + 1,
        name: "Added Item " + (i + 1),
      })),
    }));
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="text-center">
            <h1>React - Pagination Example with logic like Google</h1>
            <button onClick={this.addItems}>Add 20 items</button>{" "}
            <select
              value={this.state.pageSize}
              name="pageSize"
              onChange={(e) => this.setState({ pageSize: e.target.value })}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>{" "}
            <button onClick={this.removeItems}>Remove items from array</button>
            {this.state.pageOfItems.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
            <Pagination
              items={this.state.exampleItems}
              onChangePage={this.onChangePage}
              pageSize={this.state.pageSize}
            />
          </div>
        </div>
        <hr />
        <div className="credits text-center">
          <p className="lead">
            Original post by
            <a href="http://jasonwatmore.com" target="_top">
              {" "}
              JasonWatmore.com
            </a>
          </p>
          <p>
            <a
              href="http://jasonwatmore.com/post/2017/03/14/react-pagination-example-with-logic-like-google"
              target="_top"
            >
              React - Pagination Example with Logic like Google
            </a>
          </p>
          <p>
            Updated and fixed by <a href="https://hyan.dev">HyAn.dev</a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
