import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import useFirebaseAuth from './hooks/useFirebaseAuth';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import Dashboard from "./components/Dashboard";
import './App.css';

function App() {
  const { user } = useFirebaseAuth();

  return (
    <Router>
      <div className="App">
          <Route path="/">
            <Redirect to="/signup"/>
          </Route>
          <Route path="/signup">
            { user ? <Redirect to="/dashboard"/> : <SignUp/>}
          </Route>
          <Route path="/dashboard">
            { !user ? <Redirect to="/signup"/> : <Dashboard/>}
          </Route> 
          <Route path="/login">
            { user ? <Redirect to="/dashboard"/> : <Login/>}
          </Route>
          <Route path="/reset-password" component={ResetPassword}/>
      </div>
    </Router>
  );
}

export default App;