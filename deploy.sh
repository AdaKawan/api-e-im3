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

# Determine the environment
NODE_ENV=production

message="Creating or updating .env file with environment variables..."
center_text "$message"

cat > .env << EOF
# Environment Variables
DATABASE_URL="postgresql://postgres.ectnlrxewwpqkudnjaez:BNrS0YA64qzZAwRO@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.ectnlrxewwpqkudnjaez:BNrS0YA64qzZAwRO@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_nXk9U24lAscvHJQp_VygJF8ig1fuRcgZlMA0RzjRMX5wQK9"
DEV_REFRESH_TOKEN="OksasdaKOKSAD12-3=12_jsfjodfs342IJSDoamm3"
PROD_REFRESH_TOKEN="cvk[psodkfg[3i4i20-4uo[k[pOK{POK{SAPJFu90q802498524REWT@$%$SHEYU}}]P{p9dfi0l[faplsd[fh9h]asd]asdm;a;sdf?>"
DEV_ACCESS_TOKEN="PdqwOsji012-caisdjofa_=sda021k231psk"
PROD_ACCESS_TOKEN="}A{SPD(0234020saf)asd}{PDA9a02}p[k[idfa09u0fJOJX09sfd[2345l?>KLK:Kop?><dlfkpo]]]"
DEV_BASE_URL=http://localhost:6948
PROD_BASE_URL=https://rehan.niznet.my.id
SWAGGER_USER=rayhan
SWAGGER_PASSWORD=4k3m34ngry
NODE_ENV=production
EOF

if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Pesan
message="Deployment started in $NODE_ENV mode, pulling codes..."
center_text "$message"

# Copy the current deployment script to a temporary location
cp ./deploy.sh /tmp/deploy.sh

# Fetch the latest code from the main branch and reset the working directory
git fetch origin main && git reset --hard origin/main
git submodule update --recursive --remote

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
npm install

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