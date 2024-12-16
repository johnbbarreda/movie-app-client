import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContext, { UserProvider } from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Main = () => {
  const [user, setUser] = useState(null);

  return (
    <UserProvider value={{ user, setUser }}>
      <App />
    </UserProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
