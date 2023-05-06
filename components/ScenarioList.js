import ScenarioButton from './UI/ScenarioButton';

function ScenarioList({ scenarios }) {
  return scenarios && scenarios.map(({ name, id }) => (
    <ScenarioButton key={id} text={name} id={id} />
  ));
}

export default ScenarioList;
