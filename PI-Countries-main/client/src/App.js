import './App.css';
import Landing from './components/f_Landing/Landing';
import {Switch, Route} from 'react-router-dom';
import Home from './components/f_Home/Home';
import CardCountryDetail from './components/f_Home/f_CardCountryDetail/CardCountryDetail';
import CreateActivityCard from './components/f_CreateActivityCard/CreateActivityCard';

function App() {
  return (
    <div className="App">
      <h1>Henry Countries </h1>
      <Switch>
        <Route exact strict path='/countries/:id'>
          <CardCountryDetail/>
        </Route>
        <Route exact strict path='/createActivity'>
          <CreateActivityCard/>
        </Route>
        <Route exact strict path="/home">
          <Home/>
        </Route>
        <Route exact strict path="/">
          <Landing/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
