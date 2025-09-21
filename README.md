<h1>URL Shortener</h1>

<h2>Description</h2>
<p>
This project is a fully functional URL shortener service built using <b>Node.js</b>, <b>Express</b>, <b>MongoDB</b>, and <b>JWT authentication</b>.  
It allows users to create short links, manage them, and track analytics securely.  
Users must sign up and log in to access most features, ensuring each user's data is private and secure.
</p>

<p>
📄 If you want to view the documentation on Google Docs, you can click <a href="https://docs.google.com/document/d/1cc1gW_QO2sfVe7tN0NbxcEdrXDNactshy4GMEYIvUrM/edit?usp=sharing" target="_blank">here</a>.
</p>

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

<h2>Endpoints</h2>

<h3>POST /auth/signup</h3>
<p>Register a new user with email and password.</p>
<pre><code>{
  "Name": "Husain Hakim",
  "email": "husain@gmail.com",
  "password": "husain@1234"
}</code></pre>
<p><b>Response:</b> JWT token for authentication</p>

<h3>POST /auth/login</h3>
<p>Login an existing user.</p>
<pre><code>{
  "email": "husain@gmail.com",
  "password": "husain@1234"
}</code></pre>
<p><b>Response:</b> JWT token for authentication</p>

<h3>POST /url</h3>
<p>Create a new short URL (random or custom slug). Requires Bearer token.</p>
<pre><code>{
  "url": "https://www.google.com",
  "customSlug": "google"
}</code></pre>

<h3>PUT /url/:shortId</h3>
<p>Update an existing short URL or change its slug. Requires Bearer token.</p>
<pre><code>{
  "url": "https://www.example.com",
  "customSlug": "newslug"
}</code></pre>

<h3>POST /url/:shortId/disable</h3>
<p>Disable a short URL. Requires Bearer token.</p>

<h3>POST /url/:shortId/enable</h3>
<p>Enable a previously disabled short URL. Requires Bearer token.</p>

<h3>GET /url/:shortId/analytics</h3>
<p>Get analytics (clicks, IP, device, timestamp). Requires Bearer token.</p>

<h3>GET /url</h3>
<p>Fetch all URLs for the logged-in user. Requires Bearer token.</p>

<h3>GET /search?q=&lt;query&gt;&amp;analytics=&lt;true|false&gt;</h3>
<p>Search URLs by original URL, shortId, or custom slug. Requires Bearer token.</p>

<h3>GET /:shortId</h3>
<p>Redirect to the original URL (public endpoint, no JWT required).  
Records visit history (IP, device, timestamp).</p>

<h2>Thank You</h2>
