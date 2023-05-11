import axios from 'axios';
import Automation from '../model/automation';
import { createInstance } from './axios.service';

async function getAllAutomations(instance) {
  const { data } = await instance.get('/automations');
  return data.metadata.automations.map(
    ({ _id, name }) => new Automation(_id, name)
  );
}

async function getAutomation(id, access_token) {
  const instance = createInstance(access_token);
  const { data } = await instance.get(`/automations/${id}`);
  const { _id, name, actions, repeats, time, user } = data.metadata;
  return new Automation(_id, name, actions, time, repeats, user);
}

export { getAllAutomations, getAutomation };
