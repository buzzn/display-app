let config = {};

if (process.env.NODE_ENV === 'production') {
  config = {
    apiUrl: 'https://aws-core.buzzn.io/',
    apiPath: 'api/display',
    secure: true,
  };
} else if (process.env.NODE_ENV === 'staging') {
  config = {
    apiUrl: 'https://staging-core.buzzn.io/',
    // apiUrl: 'https://core.buzzn.io/',
    apiPath: 'api/display',
    secure: true,
  };
} else {
  config = {
    apiUrl: 'http://localhost:3000/',
    apiPath: 'api/display',
    secure: false,
  };
}

export default config;
