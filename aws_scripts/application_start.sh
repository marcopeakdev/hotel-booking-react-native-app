#!/bin/bash
cd /home/ubuntu/4m-ecommerce-app-web
rm -f .npmrc
rm -f .yarnrc.yml
/home/ubuntu/.nvm/versions/node/v16.16.0/bin/yarn run start
