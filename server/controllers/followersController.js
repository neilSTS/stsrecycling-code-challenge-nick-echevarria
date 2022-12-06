const { HEADER, createError } = require('../utils/helpers');

const followersController = {};

followersController.fetchFollowers = async (req, res, next) => {
  let { githubLogin } = req.params;
  if (!githubLogin)
    return next(
      createError({
        location: 'followersController',
        method: 'fetchFollowers',
        err: 'githubLogin not present',
      })
    );
  const githubFollowersURL = `https://api.github.com/users/${githubLogin}/followers`;
  // Nested level of followers to fetch
  const MAX_NESTED_LEVEL = 4;
  // Total number of usernames to fetch
  try {
    //Initialize counter to track number of usernames
    let MAX_USERNAMES = 100;
    // Initialize an empty array to store the followers
    let followers = [];

    // Fetch the followers of the original user
    let response = await fetch(githubFollowersURL, HEADER);
    let data = await response.json();
    if (!data)
      return next(
        createError({
          location: 'followersController',
          method: 'fetchFollowers',
          err: 'Failed initial request',
        })
      );

    // Add the followers to the array
    followers = followers.concat(data);
    //Check if Total Usernames >= 100
    if (followers.length >= MAX_USERNAMES) {
      res.locals.allFollowers = res.json(followers.slice(0, 100));
      return next();
    }

    // Iterate over the followers and get their followers
    // up to the specified nested level
    for (let i = 0; i < MAX_NESTED_LEVEL; i++) {
      let newFollowers = [];

      for (let follower of followers) {
        response = await fetch(
          `https://api.github.com/users/${follower.login}/followers`
        );
        data = await response.json();
        if (!data)
          return next(
            createError({
              location: 'followersController',
              method: 'fetchFollowers',
              err: 'Failed response from follow up fetch',
            })
          );
        newFollowers = newFollowers.concat(data);
      }

      // Add the new followers to the array
      followers = followers.concat(newFollowers);

      // Stop iterating if we have reached the maximum number of usernames
      if (followers.length >= MAX_USERNAMES) {
        res.locals.allFollowers = res.json(followers.slice(0, 100));
        return next();
      }
    }

    // Return the followers
    res.locals.allFollowers = res.json(followers);
    return next();
  } catch (err) {
    return next(
      createError({
        location: 'followersController',
        method: 'fetchFollowers',
        type: 'Route error was caught. Please see error logs for more information.',
      })
    );
  }
};

module.exports = followersController;
