import { useState } from 'react';
import './App.css';
import { Userdetails } from './Components/UserDetails';
import { Adduser } from './Components/AddUser';
import './Components/Divum_Logo.png'
import { Navbar } from './Components/Navbar';

function App() {
  const[modal,setModal] = useState(false);
  const[render,setRender] = useState(false);
  function updateUI(updaterender){
    setRender(updaterender);
  }

  return (
    <>
    <div className='home'>
      <Navbar/>
    <div className='App'> 
    
      <Userdetails updateUI={updateUI} render={render}/>
      <div className='btnalign'>
      <button className='btn'  data-testid="addusertest" onClick={()=>{setModal(true)}}>Add</button></div>
      {modal && <Adduser updateUI={updateUI} render={render} closemodal={()=>{
        setModal(false)
        }}/>}

    </div>
    </div>
    </>
  );
}

export default App;