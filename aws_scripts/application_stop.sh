#!/bin/bash

cd /home/ubuntu/4m-ecommerce-app-web

pkill -f "node_modules/.bin/next start" || true
