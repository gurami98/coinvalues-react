import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// pages
import AllCoins from './Pages/AllCoins'
import CoinProfile from './Pages/CoinProfile'
import Error from "./Pages/Error"

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <AllCoins/>
                    </Route>
                    <Route path='/currency/:symbol'
                           render={(props) => <CoinProfile {...props}/>}
                    />
                    <Route path='*'>
                        <Error/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
