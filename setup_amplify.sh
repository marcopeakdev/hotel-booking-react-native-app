#!/bin/bash

#!/bin/bash
set -e
IFS='|'

REACTCONFIG="{\
\"SourceDir\":\"./\",\
\"DistributionDir\":\".next/\",\
\"BuildCommand\":\"yarn run build\",\
\"StartCommand\":\"yarn run start\"\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"profileName\":\"default\",\
\"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
\"secretAccessKey\":\"$AWS_SECRET_ACCESS_KEY\",\
\"region\":\"$AWS_DEFAULT_REGION\"\
}"
AMPLIFY="{\
\"projectName\":\"$AWS_AMPLIFY_PROJECT_NAME\",\
\"appId\":\"$AWS_AMPLIFY_APPID\",\
\"envName\":\"$AWS_AMPLIFY_ENV\",\
\"defaultEditor\":\"code\"\
}"

FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"

PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

npm install -g @aws-amplify/cli

amplify pull \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--yes
