import './App.css';
import {connect} from "react-redux";
import {renderCoins} from "./store/actionCreators";
import * as coinSelectors from "./selectors/coinSelectors";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// pages
import AllCoins from './Pages/AllCoins'
import CoinProfile from './Pages/CoinProfile'
import Error from "./Pages/Error"

function App({coins, renderCoins}) {

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

const mapStateToProps = (state) => {
    return {
        coins: coinSelectors.getCoins(state)
    }
}

const mapDispatchToProps = {
    renderCoins
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
