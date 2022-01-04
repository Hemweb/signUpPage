import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './component/SignUp';
import Signin from './component/Signin';
import ForgotPassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';

function App() {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />

        <Route path="/signin" element={<Signin />} />

        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/user/:userId/:token' element={<ResetPassword />} />

      </Routes>
    </>
  );
}

export default App;
