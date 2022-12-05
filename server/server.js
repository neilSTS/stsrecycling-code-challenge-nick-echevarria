const express = require('express');
// const cors = require('cors');
const PORT = 3000;

const app = express();
app.use(express.json());

const helpers = require('./utils/helpers');

app.get('/followers/:githubId', async (req, res) => {
  let { githubId } = req.params;

  try {
    const response = await helpers.fetchFollowers(githubId);
    // Construct first version of followerIds 
    // NOTE: Refactor to be recursive
    const initialFollowers = await helpers.constructFollowers(response);
    //check if followerCount is less than 100 OR that we're 4 layers deep to determin another fetchFollowers call
    // for (let i = 0; i < initialFollowers.length; i++) {
    //   let follower = initialFollowers[i];
    //   console.log(follower);
    //   if (!follower.followers) { 
    //     const response = await helpers.fetchFollowers(follower.followerId); 
    //     const newFollowers = await helpers.constructFollowers(response); 
    //   }
      
    // }

    return res.status(200).json(initialFollowers);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`API Server is listening on port: ${PORT}`));

/*
 {
  "sam": {
    "greg": null, 
    "prudence": null
  },
  "eric": {
    "greg": null, 
    "prudence": null
  },
  "luke":{
    "greg": null, 
    "prudence": null
  },
  "rachel": null,
  "austin": null,
  "michonne": null,
  "ariel": {
    "greg": null, 
    "prudence": {
      "greg": null, 
      "prudence": null
    }
  },
  "ursula": null,
  "fabio": null,
  "gretchen": null,
 }
  */
