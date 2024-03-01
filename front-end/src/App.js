import "./App.css";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import MainDash from "./Components/MainDash/MainDash";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <MainDash/>
        {/* <LoginSignup /> */}
      </div>
    </div>
  );
}

export default App;
