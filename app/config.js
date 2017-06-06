let config = {};

if (process.env.NODE_ENV === 'production') {
  config = {
    apiUrl: 'https://core.buzzn.io/',
    apiPath: 'api',
    secure: true,
  };
} else if (process.env.NODE_ENV === 'staging') {
  config = {
    apiUrl: 'https://staging-core.buzzn.io/',
    apiPath: 'api',
    secure: true,
  };
} else {
  config = {
    apiUrl: 'http://localhost:3000/',
    apiPath: 'api',
    secure: false,
  };
}

export default config;
