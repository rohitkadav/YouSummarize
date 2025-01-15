import express, { query } from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import axios from 'axios';
import dotenv from 'dotenv';
import { NhostClient } from '@nhost/nhost-js';

// Load environment variables from the .env file

//Load environment variables from the .env file
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
const apiKey=process.env.API_KEY;
const graphqlEndpoint=process.env.GRAPHQLLINK;
const admin_pass=process.env.HASURAADMIN;
const apiHost=process.env.APIHOST;
const subDom=process.env.SUBDOMAIN;
const regionHost=process.env.REGION;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//Functions
const nhost = new NhostClient({
  subdomain: subDom, // Replace with your project subdomain
  region: regionHost,        // Replace with your region, e.g., "us-east-1"
});

async function signOutUser(req,res) {
  try {
      const response = await nhost.auth.signOut();
      if (!response.error) {
         console.log("User Signout");
      } else {
          console.error("Error during sign out:", response.error.message);
      }
      res.json(response);
  } catch (error) {
      console.error("Unexpected error:", error);
  }
}

async function signUp(packetData) {
  try {
    const { error, user } = await nhost.auth.signUp(packetData);
    if (error) {
      console.error('Sign-up failed:', error.message);
      return;
    }
    console.log('User signed up:', user);
}catch (err) { // Handle unexpected runtime errors
  console.error('Unexpected error during login:', err.message);

}
}


async function insertIntoNhost(userId,videoUrl,summary) {
  const query = `
   mutation InsertSummary( $userId: String!, $videoUrl: String!, $summary: String!) {
  insert_summaries_one(object: { userId: $userId, videoUrl: $videoUrl, summary: $summary }) {
    userId
    videoUrl
    summary
  }
}
  `;
  const variables = {
    userId,
    videoUrl,
    summary,
  };

  try {
    const response = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": admin_pass, // Include token if the endpoint requires authentication
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();
    if (result.errors) {
      console.error("Error inserting data:", result.errors);
    } else {
      console.log("Data inserted successfully:", result.data);
    }
  } catch (error) {
    console.error("Error in GraphQL API call:", error);
  }
}
// Routes
app.get("/",(req,res)=> {
  res.render("index.html");
})
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const packetData={email:email, password:password};
    signUp(packetData);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const logPacket={email:email, password:password};
    const { user, session, error } = await nhost.auth.signIn(logPacket);
    console.log('User logged in:'+ session.user.email);
      if (error) { // Handle login-specific errors
        console.error('Login error:', error.message);   
      }
    if (!session.user ) {
      
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    var id=session.user.id;
    var token = session.accessToken;
    // console.log(id)
    res.json({token,id});
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.post('/api/summarize', async (req, res) => {
  try {
    const { videoUrl,userId} = req.body;
    // Mock summary generation - replace with actual n8n workflow integration
  const options = {
    method: 'GET',
    url: 'https://youtube-transcript3.p.rapidapi.com/api/transcript-with-url',
    params: {
    url: videoUrl,
    flat_text: 'true',
    lang: 'en'
  },
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': apiHost,
  }
};
	const response = await axios.request(options);
  // console.log(response.data);
    res.json(response.data);
  const usertId=userId;
    insertIntoNhost(usertId,videoUrl,response.data.transcript);
  } catch (error) {
    res.status(500).json({ error: 'Error generating summary' });
  }
});

app.get('/api/history', async (req, res) => {
  const query = `
    query GetSummariesForUser($userId: String!) {
      summaries(where: { userId: { _eq: $userId } }) {
        videoUrl
        summary
      }
    }
  `;
  const variables = {
    userId: req.headers.authorization, // Provide the specific userId you want to query
  };

  try {
    const response = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": admin_pass, // Include token if the endpoint requires authentication
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("Error fetching data:", result.errors);
    } else {
      console.log("Fetched rows for user Successfu:");
    }

    // console.log(result.data.summaries);
    res.json(result.data.summaries);

  } catch (error) {
    console.error("Error in API call:", error);
  }
});


app.get('/api/signout',async (req,res)=>{
  signOutUser(req,res);

})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});