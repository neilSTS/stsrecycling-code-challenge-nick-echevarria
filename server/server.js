const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const HELPERS = require('./utils/helpers');

app.get('/followers/:githubId', async (req, res) => {
  let { githubId } = req.params;

  try {
    const response = await HELPERS.fetchFollowers(githubId);

    // TODO: Refactor to be recursive
    const initialFollowers = await HELPERS.constructFollowerObject(response);

    let followerCount = initialFollowers[1];

    //check if followerCount is less than 100 OR that we're 4 layers deep to determine another fetchFollowers call
    for (const follower in initialFollowers[0]) {
      if (!initialFollowers[0][follower] && followerCount < 100) {
        const response = await HELPERS.fetchFollowers(follower);
        const newFollowers = await HELPERS.constructFollowerObject(response);

        initialFollowers[0][follower] = newFollowers[0];
        followerCount += newFollowers[1];
      }
    }

    return res.status(200).json(initialFollowers[0]);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`API Server is listening on port: ${PORT}`));
