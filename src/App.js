import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import useFirebaseAuth from './hooks/useFirebaseAuth';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import './App.css';

function App() {
  const { user } = useFirebaseAuth();

  return (
    <Router>
      <div className="App">
        {!user && <Route exact path="/" component={SignUp}/>}
        {!user && <Route path="/login" component={Login}/> }
        <Route path="/reset-password" component={ResetPassword}/>
      </div>
    </Router>
  );
}

export default App;