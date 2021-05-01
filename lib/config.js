'use strict'

const { from } = require('env-var')

/**
 * @typedef {Object} ApplicationConfig
 * @property {KafkaConfig} kafka
 * @property {String} READLINE_KAFKA_TOPIC
 * @property {String} READLINE_FILEPATH
 */

/**
 *
 * @param {NodeJS.ProcessEnv} env
 * @returns {ApplicationConfig}
 */
module.exports = (env) => {
  const { get } = from(env)

  return {
    kafka: {
      clientId: get('KAFKA_CLIENT_ID').asString(),
      brokers: [get('KAFKA_BROKER_URI').required().asUrlString()],
      ssl: get('KAFKA_SSL').default('true').asBool(),
      sasl: {
        mechanism: get('KAFKA_SASL_MECHANISM').default('plain').asString(),
        username: get('KAFKA_SASL_USER').required().asString(),
        password: get('KAFKA_SASL_PASS').required().asString()
      }
    },

    READLINE_KAFKA_TOPIC: get('READLINE_KAFKA_TOPIC').default('readline-logs').asString(),
    READLINE_FILEPATH: get('READLINE_FILEPATH').required().asString()
  }
}
