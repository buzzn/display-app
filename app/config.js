let config = {};

if (process.env.NODE_ENV === 'production') {
  config = {
    apiUrl: 'https://app.buzzn.net/',
    apiPath: 'api/v1',
  };
} else if (process.env.NODE_ENV === 'staging') {
  config = {
    apiUrl: 'https://staging.buzzn.net/',
    apiPath: 'api/v1',
  };
} else {
  config = {
    apiUrl: 'http://localhost:3000/',
    apiPath: 'api/v1',
  };
}

export default config;
