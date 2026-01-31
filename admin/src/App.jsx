import './App.css'
import Navbar from"./components/Navbar/Navbar.jsx"
import Sidebar from "./components/Sidebar/Sidebar.jsx"
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Orders from './pages/Orders/Orders.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const url="http://localhost:4000"

  return (
    <>
    <div>
       <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
         />
      <Navbar/>
      <hr />
     <div className='app-content'>
      <Sidebar/>
         <Routes>
          <Route path='/' element={<Add url={url} />}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/order' element={<Orders url={url}/>}/>
         </Routes>
      </div>    
      
    </div>

    </>
  )
}

export default App
