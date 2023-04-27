import Scenario from '../model/scenario';

async function getAllScenarios(instance) {
  const { data } = await instance.get('/scenarios');

  return data.metadata.scenarios.map(
    ({ _id, name, actions, isFavorite, user }) =>
      new Scenario(_id, name, isFavorite, actions, user)
  );
}

export { getAllScenarios };
