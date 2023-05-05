import Scenario from '../model/scenario'

async function getAllScenarios(instance) {
  const { data } = await instance.get('/scenarios')

  return data.metadata.scenarios.map(
    ({ _id, name, actions, isFavorite, user }) =>
      new Scenario(_id, name, isFavorite, actions, user)
  )
}

async function saveScenario(instance, name, actions) {
  return instance.post('/scenarios', {name, actions})
}

async function activateScenario(instane, sceneId) {
  await instane.post(`/scenarios/${sceneId}/activate`, {})
}

export { getAllScenarios, saveScenario, activateScenario }
