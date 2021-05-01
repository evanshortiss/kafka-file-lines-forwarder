TAG=${TAG:-latest}

docker build . -t quay.io/evanshortiss/kafka-file-lines-forwarder:$TAG
