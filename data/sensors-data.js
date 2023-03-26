import Sensor from '../model/sensor';

export const SENSORS = [
  new Sensor('Sensor 1', 'Heat', '34 °C', true),
  new Sensor('Sensor 2', 'Humidity', '40 %', true),
  new Sensor('Sensor 3', 'Light', '150 lux', true),
  new Sensor('Sensor 4', 'Sound', '40 dB', true),
  new Sensor('Sensor in dining room', 'Movement', null, false),
];
