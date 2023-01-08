import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SimpleBottomNavigation from './components/Navbar/Navbar';
import Trending from "./components/Pages/Trending";
import Movies from "./components/Pages/Movies";
import Series from "./components/Pages/Series";
import Search from "./components/Pages/Search";



function App() {
  return (
    <Router className="App">
      <Header />
      
      <div className=' text-white px-4 tablet:px-16 md:p-10 mt-20 min-h-screen'>
          <Switch>
              <Route path="/" component={Trending} exact/>
              <Route path="/movies" component={Movies} />
              <Route path="/series" component={Series} />
              <Route path="/search" component={Search} />
          </Switch>
        </div>
      <SimpleBottomNavigation />

    </Router>
  );
}

export default App;
