# Use the official lightweight Python image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY . .

# Expose the port that Cloud Run expects
EXPOSE 8080

# Use gunicorn as the production server
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
