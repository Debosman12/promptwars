# Use the lightweight Nginx image to serve static files
FROM nginx:alpine

# Copy the static web files to the Nginx html directory
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/

# Google Cloud Run uses port 8080 by default. 
# We update the default Nginx configuration to listen on port 8080 instead of 80.
RUN sed -i 's/listen  *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

# Expose the port
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
