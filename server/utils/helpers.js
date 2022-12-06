const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

const HELPERS = {
  createError: (errInfo) => {
    const { location, method, err } = errInfo;
    return {
      log: `${location}.${method} : ERROR: ${
        typeof err === 'object' ? JSON.stringify(err) : err
      }`,
      message: {
        err: `Error occurrentGithubIded in ${location}.${method}. Check server logs for more details.`,
      },
    };
  },
  HEADER: {
    headers: {
      Authorization: GITHUB_ACCESS_TOKEN,
    },
  },
};

module.exports = HELPERS;
