import { createContext, useState } from 'react';

const initalValue = {};
export const UserContext = createContext(initalValue);

export function UserContextProvider({ children }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  function onSuccessAuth(id, name, email) {
    setUserId(id);
    setName(name);
    setEmail(email);
  }

  function onLogout() {
    setName('');
    setEmail('');
    setUserId('');
  }

  return (
    <UserContext.Provider
      value={{ name, email, id: userId, onSuccessAuth, onLogout }}
    >
      {children}
    </UserContext.Provider>
  );
}
