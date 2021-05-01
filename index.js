'use strict'

process.on('SIGINT', () => process.exit(0))

const config = require('./lib/config')(process.env)
const log = require('barelog')
const { Kafka } = require('kafkajs')
const Tail = require('nodejs-tail')

const producer = new Kafka(config.kafka).producer()

new Tail(config.READLINE_FILEPATH)
  .on('line', async function sendLineToKafka (line) {
    try {
      log(`sending line to kafka: "${line}"`)
      await producer.connect()
      await producer.send({
        topic: config.READLINE_KAFKA_TOPIC,
        messages: [
          {
            value: line
          }
        ]
      })
    } catch (e) {
      log('error sending log to kafka:')
      log(e)
    }
  })
  .watch();
