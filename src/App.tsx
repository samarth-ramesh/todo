import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Tasks from "./Components/Task";

function App() {
  return (
      <>
        <Router>
            <Switch>
                <Route exact={true} path={"/"}><Tasks/></Route>
            </Switch>
        </Router>
      </>
  )
}

export default App
