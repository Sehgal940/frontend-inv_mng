import './App.css';
import Nav from './components/Nav';
import {Routes,Route} from 'react-router-dom';
import Signin from './components/Signin';
import Register from './components/Register';
import Home from './components/Home';
import { useContext } from 'react';
import { appState } from './contextAPI/Context';

function App() {
  const {log}=useContext(appState)
  return (

    <div className="App">
      <Routes>
      <Route path='/' Component={Nav}>
      {
        log ?
        <>
        <Route index Component={Home}/>
        <Route path={'home'} Component={Home}/>
        <Route path={'signin'} Component={Home}/>
        <Route path={'register'} Component={Home}/> 
        </>
        :
        <>
        <Route index Component={Register}/>
        <Route path={'home'} Component={Signin}/>
        <Route path={'signin'} Component={Signin}/>
        <Route path={'register'} Component={Register}/> 
        </>
      }
      </Route>
      </Routes>
    </div>
  );
}

export default App;
