import ScenarioButton from '../../../components/UI/ScenarioButton';

function AutomationList({ automations, onElementPress }) {
  return automations.map(({ name, id }) => (
    <ScenarioButton onPress={(e) => onElementPress(id)} text={name} key={id} />
  ));
}

export default AutomationList;
