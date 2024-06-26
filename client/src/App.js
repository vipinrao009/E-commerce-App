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
import AdminRoutes from './components/routes/Admin';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import Users from './Pages/Admin/Users';
import Profile from './Pages/User/Profile';
import Orders from './Pages/User/Orders';


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

      {/* user Routes */}
      <Route path='/dashboard' element={<PrivateRoutes/>}>
        <Route path='user' element={<Dashboard/>}></Route>
        <Route path='user/profile' element={<Profile/>}></Route>
        <Route path='user/orders' element={<Orders/>}></Route>
      </Route>

      {/* admin Routes */}
      <Route path='/dashboard' element={<AdminRoutes/>}>
        <Route path='admin' element={<AdminDashboard/>}></Route>
        <Route path='admin/create-category' element={<CreateCategory/>}></Route>
        <Route path='admin/create-product' element={<CreateProduct/>}></Route>
        <Route path='admin/users' element={<Users/>}></Route>
      </Route>
      
    </Routes>
    </>
  );
}

export default App;
