<h1>URL Shortener</h1>

<h2>Description</h2>
<p>
This project is a fully functional URL shortener service built using <b>Node.js</b>, <b>Express</b>, <b>MongoDB</b>, and <b>JWT authentication</b>.  
It allows users to create short links, manage them, and track analytics securely.  
Users must sign up and log in to access most features, ensuring each user's data is private and secure.
</p>

<h3><b>
📄 If you want to view the documentation on Google Docs, you can click <a href="https://docs.google.com/document/d/1cc1gW_QO2sfVe7tN0NbxcEdrXDNactshy4GMEYIvUrM/edit?usp=sharing" target="_blank">here</a>.
</h3></b>

<h2>Features</h2>
<ul>
  <li>User signup and login with JWT authentication</li>
  <li>Create short URLs (random or custom slug)</li>
  <li>Redirect to original URLs using short links</li>
  <li>Track visit history (IP, device, timestamp)</li>
  <li>Disable and enable short URLs</li>
  <li>Update the URLs</li>
  <li>Search URLs in the database</li>
  <li>Secure backend using middleware authentication</li>
</ul>

<h2>Tech Stack</h2>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>Mongoose</li>
  <li>JWT for authentication</li>
  <li>express-useragent for device tracking</li>
</ul>

<h2>Project Setup</h2>

<h3>Step 1: Download the Repository</h3>
<pre><code>git clone https://github.com/husainhakim/URL-Shortener.git</code></pre>

<h3>Step 2: Navigate to the Folder</h3>
<pre><code>cd backend</code></pre>

<h3>Step 3: Download the Dependencies</h3>
<pre><code>npm install</code></pre>

<h3>Step 4: Make .env file</h3>
<pre><code>touch .env</code></pre>

<h3>Step 5: Add the following variables to <code>.env</code></h3>
<pre><code>
PORT=
DB_URL= 
JWT_SECRET=
JWT_Expiry_Time=
</code></pre>

<h3>Step 6: Run the Project</h3>
<pre><code>npm start</code></pre>

<p align="center">
  <img src="URL_Shortener.png" alt="URL Shortener Diagram" width="900">
</p>
<h2>Endpoints</h2>

| Method | Endpoint | Description | Auth Required | Request Body / Notes |
|--------|---------|-------------|---------------|--------------------|
| POST   | /auth/signup | Register a new user | No | `{ "Name": "Husain Hakim", "email": "husain@gmail.com", "password": "husain@1234" }` |
| POST   | /auth/login  | Login an existing user | No | `{ "email": "husain@gmail.com", "password": "husain@1234" }` |
| POST   | /url         | Create a new short URL | Yes | `{ "url": "https://www.google.com", "customSlug": "google" }` |
| PUT    | /url/:shortId | Update an existing short URL | Yes | `{ "url": "https://www.example.com", "customSlug": "newslug" }` |
| POST   | /url/:shortId/disable | Disable a short URL | Yes | - |
| POST   | /url/:shortId/enable  | Enable a short URL | Yes | - |
| GET    | /url/:shortId/analytics | Get analytics for a URL | Yes | - |
| GET    | /url        | Fetch all URLs for the user | Yes | - |
| GET    | /search?q=<query>&analytics=<true|false> | Search URLs | Yes | - |
| GET    | /:shortId   | Redirect to original URL | No | Records visit history |
<h2>Thank You</h2>
