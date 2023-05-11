import mqtt from 'precompiled-mqtt'
import appConfig from '../configs/app.config'

const { ADAFRUIT_USER, ADAFRUIT_KEY, ADAFRUIT_TOPIC_PREFIX } = appConfig
function createMQTTClient() {
  const URL = 'mqtts://io.adafruit.com/'
  return mqtt.connect(URL, {
    username: ADAFRUIT_USER,
    password: ADAFRUIT_KEY,
  })
}

function getAdafruitKey(topic) {
  const prefix = ADAFRUIT_TOPIC_PREFIX
  return (prefix + topic).toLowerCase().replace('.', '-dot-')
}

export { createMQTTClient, getAdafruitKey }
