import App from './App';
import Welcome from "./Welcome";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Main = () => {

  const [user, setUser] = useState(null);   

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Welcome user={user} setUser={setUser} />}/>
          <Route path="/app" element={<App user={user} setUser={setUser} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main;