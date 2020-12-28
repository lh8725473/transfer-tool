#!/bin/bash
docker run --rm -v $(pwd):/data/code base-image-node:10.17.0 sh -c "cd /data/code && npm install yarn -g && yarn install && yarn build"