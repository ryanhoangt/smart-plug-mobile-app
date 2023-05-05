import { useContext } from 'react';
import { activateScenario } from '../services/scenario.service';
import ScenarioButton from './UI/ScenarioButton';
import { AuthContext } from '../store/auth-context';
import { createInstance } from '../services/axios.service';

function ScenarioList({ scenarios }) {
  return scenarios && scenarios.map(({ name, id }) => (
    <ScenarioButton key={id} text={name} id={id} />
  ));
}

export default ScenarioList;
