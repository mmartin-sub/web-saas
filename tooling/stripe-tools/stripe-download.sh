#!/bin/sh
# parameter 1, a publishable Stripe key
# parameter 2, name of the output file (i.e. stripe-pricing.prod.json)

# Get the directory of the running script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Print the script directory
# echo "The script is running from: $SCRIPT_DIR"

# Define the configuration
MAIN_REPO_DIR="$SCRIPT_DIR/../.."
CONFIG_JSON_DIR="$MAIN_REPO_DIR/apps/nextjs/src/config/price"

update_stripe_pricing() {
  local api_key="$1"
  local destination_file="$2"

# Check if $2 is provided
if [ -z "$2" ]; then
  echo "Error: Destination filename is not provided."
  exit 1
fi

 echo "Destination file: $destination_file"

  stripe products list --expand data.default_price --api-key "$api_key" > $CONFIG_JSON_DIR/products.json
stripe prices list --expand=data.currency_options --api-key "$api_key" > $CONFIG_JSON_DIR/prices.json
bun run $CONFIG_JSON_DIR/generate-pricing.js > $CONFIG_JSON_DIR/$destination_file

# cp $CONFIG_JSON_DIR/stripe-pricing.json $CONFIG_JSON_DIR/"$2"
}

# Function to set up the environment and update Stripe pricing
setup_environment() {
  local env_file="$1"
  local api_key="$2"
  local pricing_file="$3"
  local suffix="$4"

  echo "$suffix setup"
  source "$MAIN_REPO_DIR/$env_file"
  update_stripe_pricing "$api_key" "$pricing_file"
  cp "$CONFIG_JSON_DIR/products.json" "$CONFIG_JSON_DIR/products.$suffix.json"
  cp "$CONFIG_JSON_DIR/prices.json" "$CONFIG_JSON_DIR/prices.$suffix.json"
  cp "$CONFIG_JSON_DIR/$pricing_file" "$MAIN_REPO_DIR/packages/api/src/router/"
}

setup_environment ".env.development" "$STRIPE_API_KEY" "stripe-pricing.dev.json" "dev"
setup_environment ".env.production" "$STRIPE_API_SECRET_KEY" "stripe-pricing.prod.json" "prod"
