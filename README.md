# kafka-file-lines-forwarder

Watches a file and forwards each newline to Kafka.

## Usage via Docker

Imagine you have two containers running. These containers share a volume named
"readline".

Container A appends logs to a file on the "readline" volume.

Container B can use `kafka-file-lines-forwarder` to log each new log line
to Kafka.

```bash
# Create a volume...
docker volume create readline

# ...and a container (container A) that uses it
docker run --rm -ti \
--mount source=readline,target=/logs \
busybox /bin/sh

# Create a log file inside the volume from container A
touch /logs/log.txt
```

Start container B, the Kafka forwarder:

```bash
# Start the Kafka forwarder and watch the log file created by container A
docker run
-e KAFKA_BROKER_URI=my-broker:9092 \
-e KAFKA_SASL_USER="username" \
-e KAFKA_SASL_PASS="password" \
-e READLINE_FILEPATH=/logs/log.txt \
--mount source=readline,target=/logs \
quay.io/evanshortiss/kafka-file-lines-forwarder:latest
```

Return to container "A" and start logging into the *log.txt*:

```bash
echo "hello" >> /logs/log.txt
echo "world" >> /logs/log.txt
echo "!" >> /logs/log.txt
```

Each of these lines will be written to Kafka as individual events.
