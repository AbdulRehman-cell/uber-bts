# Step-by-Step Deployment Guide

To deploy this static site, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Build the Docker image:**
   ```bash
   docker build -t static-site .
   ```

3. **Run the Docker container to verify:**
   ```bash
   docker run -p 80:80 static-site
   ```

   Open your browser and go to `http://localhost` to see if it's working.

4. **Push to Render:**
   Before this, ensure you have the Render service set up and your Docker credentials configured.
   ```bash
   echo $RENDER_API_KEY | docker login --username your_render_username --password-stdin your_render_container_registry
   docker tag static-site your_render_container_registry/static-site:1.0.0
   docker push your_render_container_registry/static-site:1.0.0
   ```

5. **Visit your deployed site on Render!**