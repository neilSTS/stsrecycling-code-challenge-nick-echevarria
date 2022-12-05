const HEADERS = require('./github');

const HELPERS = {
  fetchFollowers: async (githubId) => {
    //NOTE: Employ a caching solution to limit the number of API calls
    try {
      const githubFollowersAPI = `https://api.github.com/users/${githubId}/followers`;
      
      const githubResponse = await fetch(githubFollowersAPI, HEADERS);
      const data = await githubResponse.json();

      return data;
    } catch (err) {
      console.log('Error triggered in fetchFollowers function');
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

module.exports = HELPERS;
