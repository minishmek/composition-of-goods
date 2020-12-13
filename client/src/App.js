import './App.css';
import Auth from "./components/Auth";
import WareHouse from "./components/WareHouse";

function App() {

  const login = () => {
    return localStorage.getItem('login')
  }

  return (
    <div className="App">
      {
        !login() ?
          (
            <Auth/>
          )
          :
          (
            <WareHouse/>
          )
      }
    </div>
  );
}

export default App;
