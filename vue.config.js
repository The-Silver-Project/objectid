module.exports = {
  ...(process.env.NODE_ENV === 'production' && { publicPath: '/objectid/' }),
};
