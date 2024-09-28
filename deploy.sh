#!/bin/bash
set -e

center_text() {
    local text="$1"
    local text_length=${#text}
    local line=$(printf "%-${text_length}s" "=" | tr ' ' '=')
    local padding=$(( (text_length - ${#text}) / 2 ))
    printf "%s\n" "$line"
    printf "%*s%s%*s\n" $padding "" "$text" $padding ""
    printf "%s\n" "$line"
}

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed"
    exit 1
fi

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "npm is not installed"
    exit 1
fi

# Check for PM2
if ! command -v pm2 &> /dev/null; then
    echo "PM2 is not installed"
    exit 1
fi

if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Determine the environment
NODE_ENV=${NODE_ENV:-development}

# Pesan
message="Deployment started in $NODE_ENV mode, pulling codes..."
center_text "$message"

# Copy the current deployment script to a temporary location
cp ./deploy.sh /tmp/deploy.sh

# Fetch the latest code from the main branch and reset the working directory
# git fetch origin main && git reset --hard origin/main
# git submodule update --recursive --remote

# Check if the temporary deployment script exists
if [ -f /tmp/deploy.sh ]; then
    # Compare the current deployment script with the temporary deployment script to detect any new changes
    if ! cmp -s /tmp/deploy.sh ./deploy.sh; then
        message="New deployment script detected, restarting..."
        center_text "$message"
        exec /bin/bash ./deploy.sh

        exit 0
    fi
fi

message="node_modules folder does not exist. Running npm install."
center_text "$message"
npm i

message="Building the project..."
center_text "$message"
npm run build

message="Restarting or starting PM2 process..."
center_text "$message"
if pm2 describe api-e-im3 > /dev/null; then
    pm2 restart api-e-im3
else
    pm2 start dist/main.js --name api-e-im3
fi

message="Deployment finished in $NODE_ENV mode"
center_text "$message"