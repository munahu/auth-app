import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import useFirebaseAuth from './hooks/useFirebaseAuth';
import ClipLoader from "react-spinners/ClipLoader";
import SignUp from './components/SignUp';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import Dashboard from "./components/Dashboard";
import './App.css';
import { useEffect, useState } from "react";

function App() {

  const { user } = useFirebaseAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loaderTimeout= setTimeout(() => {
      setLoading(false);
    }, 2000)

    return () => {
      clearTimeout(loaderTimeout)
    }
  }, [])


  return (
    <div className="App">
    { loading && 
      <div className="loaderParent">
        <ClipLoader
        size={50}
        loading={loading}
        />
      </div>
    }
      { !loading && 
        <Router>
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
        </Router>
      }
    </div>
  );
}

export default App;