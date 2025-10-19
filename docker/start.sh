#!/bin/bash

# Wait for database to be ready
echo "Waiting for database connection..."
while ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USERNAME; do
    echo "Database is unavailable - sleeping"
    sleep 2
done
echo "Database is ready!"

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Clear and cache configuration
echo "Optimizing Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start Apache
echo "Starting Apache..."
apache2-foreground
