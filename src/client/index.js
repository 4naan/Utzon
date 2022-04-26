import React from "react";
import ReactDOM from "react-dom";
import { useRoutes, A } from "hookrouter";
import ExampleComponent from "./components/ExampleComponent";
import SavedPropertyList from "./components/SavedPropertyList";
const routes = {
    "/": () => <ExampleComponent />,
    "/propertylist": () => <SavedPropertyList />,
    "/contact": () => <Contact />
};
function App() {
    const routeResult = useRoutes(routes);
    return (
        <div className="App">
            {routeResult}
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById("container"));

