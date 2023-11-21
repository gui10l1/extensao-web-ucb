import { Routes as RoutesDOM, Route, useNavigate } from  'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { SignUp } from '../pages/SignUp';
import { useEffect } from 'react';
import { Profile } from '../pages/Profile';

export const Routes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userStored = localStorage.getItem('LucasUcb@Authentication');

    if (userStored) {
      navigate('/home')
    } else {
      navigate('/');
    }
  }, []);

  return (
    <RoutesDOM>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
    </RoutesDOM>
  );
}