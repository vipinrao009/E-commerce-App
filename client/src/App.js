import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Policy from './Pages/Policy';
import PageNotFount from './Pages/PageNotFount';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/User/Dashboard';
import PrivateRoutes from './components/routes/Private';
import ForgotPassword from './Pages/Auth/ForgotPassword';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='*' element={<PageNotFount/>}/>

      {/* Private Routes */}
      <Route path='/dashboard' element={<PrivateRoutes/>}>
        <Route path='' element={<Dashboard/>}></Route>
      </Route>
      
    </Routes>
    </>
  );
}

export default App;
