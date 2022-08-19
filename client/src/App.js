import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './page/Landing';
import Market from './page/Market';
import About from './page/About';
import Post from './page/Post';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Profile from "./page/Profile";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/market" element={<Market />} />
          <Route path="/about" element={<About />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
