import mqtt from 'precompiled-mqtt'
import { ADAFRUIT_USER, ADAFRUIT_KEY, ADAFRUIT_TOPIC_PREFIX } from '@env'

function createMQTTClient() {
  const URL = 'wss://io.adafruit.com:443/mqtt/'
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
