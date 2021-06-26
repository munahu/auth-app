import {
  BrowserRouter as Router,
  Switch,
  Route
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
        <Switch>
          {!user && <Route path="/sign-up" component={SignUp}/>}
          {!user && <Route path="/login" component={Login}/> }
          <Route path="/reset-password" component={ResetPassword}/>
          {user && <Route path="/" component={Dashboard}/>}
        </Switch>
      </div>
    </Router>
  );
}

export default App;