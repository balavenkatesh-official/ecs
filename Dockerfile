# Use an official nginx image
FROM public.ecr.aws/docker/library/nginx:stable-alpine

# Copy the build output to replace the default nginx contents.
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

