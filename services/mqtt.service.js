import mqtt, { MqttClient } from 'precompiled-mqtt'
import appConfig from '../configs/app.config'

const { ADAFRUIT_USER, ADAFRUIT_KEY, ADAFRUIT_TOPIC_PREFIX } = appConfig
function createMQTTClient() {
  const URL = 'mqtt://io.adafruit.com/'
  const client = mqtt.connect(URL, {
    username: ADAFRUIT_USER,
    password: ADAFRUIT_KEY,
  })
  return client
}

function getAdafruitKey(topic) {
  const prefix = ADAFRUIT_TOPIC_PREFIX
  return (prefix + topic).toLowerCase().replace('.', '-dot-')
}

export { createMQTTClient, getAdafruitKey }
