import { createContext, useState } from 'react';

export const UserDataContext = createContext({
  id: '', // user's id
  name: '', // user's name
  allDevices: [],
  allSensors: [],
  allScenarios: [],
  allAutomations: [],
  onSuccessAuth: (id, name) => {},
  onLogout: () => {},
  updateAllDevices: (devicesArr) => {},
  updateAllSensors: (sensorsArr) => {},
  updateAllScenarios: (scenariosArr) => {},
  updateAllAutomations: () => {},
});

function UserDataContextProvider({ children }) {
  // STATES
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [allDevices, setAllDevices] = useState([]);
  const [allSensors, setAllSensors] = useState([]);
  const [allScenarios, setAllScenarios] = useState([]);
  const [allAutomations, setAllAutomations] = useState([]);

  // HANDLERS
  const onSuccessAuth = (id, name) => {
    setId(id);
    setName(name);
  };

  const onLogout = () => {
    setId(null);
    setName(null);
  };

  const updateAllDevices = (devicesArr) => {
    setAllDevices(devicesArr);
  };

  const updateAllSensors = (sensorsArr) => {
    setAllSensors(sensorsArr);
  };

  const updateAllScenarios = (scenariosArr) => {
    setAllScenarios(scenariosArr);
  };

  const updateAllAutomations = (automationsArr) => {
    setAllAutomations(automationsArr);
  };

  const value = {
    id,
    name,
    allDevices,
    allSensors,
    allScenarios,
    allAutomations,
    onSuccessAuth,
    onLogout,
    updateAllDevices,
    updateAllSensors,
    updateAllScenarios,
    updateAllAutomations,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataContextProvider;
