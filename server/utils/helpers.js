const HEADERS = require('./github');

let followersCache = {};

const helpers = {
  fetchFollowers: async (githubId) => {
    if (followersCache[githubId]) {
      console.log("USING CACHE");
      return followersCache[githubId];
    } else {
      try {
        const githubFollowersAPI = `https://api.github.com/users/${githubId}/followers`;
        const githubResponse = await fetch(githubFollowersAPI, HEADERS);
        const data = await githubResponse.json();

        followersCache[githubId] = data; 

        return data;
      } catch (err) {
        console.log('Error triggered in fetchFollowers function');
      }
    }
  },
  constructFollowerObject: (followers) => {
    const updatedFollowers = {};
    //populate initial followers
    for (let i = 0; i < followers.length; i++) {
      let followerId = followers[i].login;
      updatedFollowers[followerId] = null;
    }

    return [updatedFollowers, followers.length];
  },
};

module.exports = helpers;
