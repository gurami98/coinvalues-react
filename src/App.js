import './App.css';
import {useEffect} from "react";
import {getAllCoins} from "./API/coinAPI";

function App() {
    useEffect(() => {
        fetchCoins()
        const refreshCoins = setInterval(() => {
            fetchCoins()
        }, 30000)
        return () => {
            clearInterval(refreshCoins)
        }
    }, []);

    const fetchCoins = async () => {
        const response = await getAllCoins();
        console.log(response.data)
    }

  return (
    <div className="App">

    </div>
  );
}

export default App;
