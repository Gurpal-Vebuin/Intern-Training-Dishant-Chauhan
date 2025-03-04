#!/bin/bash

# Variables
IMAGE_NAME="mysql"
CONTAINER_NAME="mysql-office-container"
MYSQL_ROOT_PASSWORD="Dyson.Sphere3098"
MYSQL_DATABASE="office"
SQL_FILE=$1  # First argument is the SQL file path
MYSQL_PORT=3307  # Change if needed

# Check if SQL file is provided
if [ -z "$SQL_FILE" ]; then
    echo "Usage: $0 <sql-file>"
    exit 1
fi

# Check if the file exists
if [ ! -f "$SQL_FILE" ]; then
    echo "Error: SQL file '$SQL_FILE' not found!"
    exit 1
fi

# Step 1: Check if port is free
if lsof -i :$MYSQL_PORT >/dev/null; then
    echo "Port $MYSQL_PORT is already in use. Choose another port."
    exit 1
fi

# Step 2: Pull MySQL Docker Image if not available
if [[ "$(docker images -q mysql:latest 2> /dev/null)" == "" ]]; then
    echo "Pulling MySQL latest image..."
    docker pull mysql:latest
fi

# Step 3: Run MySQL Container
echo "Starting MySQL container on port $MYSQL_PORT..."
docker run -d --name $CONTAINER_NAME \
  -e MYSQL_ROOT_PASSWORD=$MYSQL_ROO T_PASSWORD \
  -e MYSQL_DATABASE=$MYSQL_DATABASE \
  -p $MYSQL_PORT:3306 \
  mysql:latest

# Step 4: Wait for MySQL to start
echo "Waiting for MySQL to be ready..."
sleep 15  # Increase wait time if needed

# Step 5: Verify if MySQL container is running
if ! docker ps | grep -q $CONTAINER_NAME; then
    echo "MySQL container failed to start. Check logs with: docker logs $CONTAINER_NAME"
    exit 1
fi

# Step 6: Execute the provided SQL file inside the container
echo "Executing schema file: $SQL_FILE..."
docker exec -i $CONTAINER_NAME mysql -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE < "$SQL_FILE"

# Step 7: Verify database setup
echo "Database setup complete! Checking tables..."
docker exec -i $CONTAINER_NAME mysql -u root -p$MYSQL_ROOT_PASSWORD -e "SHOW TABLES;" $MYSQL_DATABASE

echo "MySQL container setup complete! You can connect on port $MYSQL_PORT."
