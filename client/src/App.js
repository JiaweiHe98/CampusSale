import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from './page/Landing';
import Market from './page/Market';
import About from './page/About';
import Post from './page/Post';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Profile from "./page/Profile";
import {useEffect, useState} from "react";


function App() {
  const [user, setUser] = useState(null);
  const [seeingUserId, setSeeingUserId] = useState(null);
  const [seeingPostId, setSeeingPostId] = useState(null);


  // read userinfo
  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))
      user.date = Date.parse(user.registeredTime)
      user.dateString = new Date(user.date).toLocaleDateString('en-us', {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
      user.token = token;
      setSeeingUserId(user.id);
      setUser(user);
    } catch (e) {
      setUser(null)
    }

    try {
      setSeeingUserId(JSON.parse(localStorage.getItem('seeingUserId')))
    } catch (e) {
      setSeeingUserId(null)
    }

    try {
      setSeeingPostId(JSON.parse(localStorage.getItem('seeingPostId')))
    } catch (e) {
      setSeeingPostId(null)
    }

  }, [])

  useEffect(() => {
    if (seeingUserId !== null) {
      localStorage.setItem('seeingUserId', JSON.stringify(seeingUserId))
    }
    if (seeingPostId !== null) {
      localStorage.setItem('seeingPostId', JSON.stringify(seeingPostId))
    }
  }, [seeingUserId, seeingPostId])


  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing user={user} setSeeingUserId={setSeeingUserId}/>}/>
          <Route path="/login" element={<Login setUser={setUser} setSeeingUserId={setSeeingUserId}/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/profile"
                 element={<Profile user={user} setUser={setUser} seeingUserId={seeingUserId} setSeeingPostId={setSeeingPostId}
                                   setSeeingUserId={setSeeingUserId}/>}/>
          <Route path="/market"
                 element={<Market user={user} setSeeingPostId={setSeeingPostId} setSeeingUserId={setSeeingUserId}/>}/>
          <Route path="/about" element={<About user={user} setSeeingUserId={setSeeingUserId}/>}/>
          <Route path="/post"
                 element={<Post user={user} seeingPostId={seeingPostId} setSeeingUserId={setSeeingUserId}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
