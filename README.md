# YouTube Video Summarization Platform

A web application that enables users to input YouTube URLs and receive AI-generated summaries of the videos. Built with cutting-edge technologies for backend, frontend, and AI-driven workflows, this platform ensures a seamless and efficient user experience. This project is developed by Rohit Kadav (TechSword).

---

## **Key Features**

1. **User Authentication:**
   - Secure user registration and login using Nhost's authentication services.

2. **YouTube Video Summarization:**
   - Input a YouTube URL to generate concise and meaningful summaries of the video content.
   - Summaries are generated using AI-powered workflows for high accuracy and relevance.

3. **Database Management:**
   - Store user information, summary history, and preferences in a structured and scalable manner using Nhost's database.

4. **Intuitive User Interface:**
   - A sleek and modern frontend designed with Bolt.new for effortless user interaction.

5. **AI Workflow Integration:**
   - Leverage the n8n AI-powered YouTube Video Summarization workflow for seamless transcript fetching and summarization.
   - Use Rapid API to integrate language models for generating high-quality summaries.

6. **Responsive Design:**
   - Fully responsive user interface optimized for both desktop and mobile devices.

---

## **Tech Stack**

### **Backend(as a software):**
- **[Nhost](https://nhost.io/):**
  - Authentication and user management.
  - Managed PostgreSQL database for storing application data.

### **Frontend:**
- **HTML/HTML5,CSS, JAVASRCIPT:**
  - Modern frontend development framework for building an intuitive UI.

### **Backend:**
- **Node Js, Express Js:**
  - Modern frontend development framework for building an intuitive UI.


### **AI Workflow:**
- **[n8n](https://n8n.io):**
  - Automates transcript fetching and processing using the YouTube Video Summarization workflow.
- **[OpenRouter](https://openrouter.ai/):**
  - Provides access to language models (LLMs) for efficient and accurate summarization.

---

## **Setup Instructions**

### **Prerequisites:**
1. Nhost account for backend services.
2. Html,css,js for frontend development.
3. n8n account with the AI-powered YouTube Video Summarization workflow configured.
4. OpenRouter API key for AI model integration.

### **Steps to Set Up the Project:**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/youtube-summary-platform.git
   cd youtube-summary-platform
   ```

2. **Backend Configuration:**
   - Sign in to Nhost and create a new project.
   - Set up authentication and database tables for user and summary data.
   - Update the environment variables to include your Nhost project credentials.

3. **Frontend Setup:**
   - import the project and keep the files in public.
   - Customize the user interface as needed and link it to the Nhost backend.

4. **AI Workflow Integration:**
   - Configure the n8n YouTube Video Summarization workflow with your YouTube Data API key and OpenRouter credentials.
   - Test the workflow independently before integrating it into the platform.

5. **Environment Variables:**
   - Create a `.env` file with the following keys:
     ```env
     const PORT = process.env.PORT || 3000;
     const apiKey=process.env.API_KEY; 
     const graphqlEndpoint=process.env.GRAPHQLLINK;
     const admin_pass=process.env.HASURAADMIN;
     const apiHost=process.env.APIHOST;
     const subDom=process.env.SUBDOMAIN;
     const regionHost=process.env.REGION;
     
     ```

6. **Start the Application:**
   - Run the backend and frontend services.
   ```bash
   npm init -y # For the frontend (if using a Node.js-based framework)
   npm i # for installing dependencies.
   node index.js
   ```

---

## **Future Enhancements**

1. **Multilingual Summaries:**
   - Support summarization in multiple languages.
2. **Video Analysis Features:**
   - Extract keywords, timestamps, and key moments from videos.
3. **User Preferences:**
   - Allow users to customize summary length and style.
4. **Enhanced UI:**
   - Add dark mode and advanced visualization tools.

---

## **Contributions**
    We welcome contributions to enhance the platform. Feel free to submit a pull request or open an issue for any feature requests or bug reports.

---

