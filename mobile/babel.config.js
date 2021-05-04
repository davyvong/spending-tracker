module.exports = api => {
  api.cache(true);
  return {
    plugins: [['module-resolver', { root: ['./app'] }]],
    presets: ['babel-preset-expo'],
  };
};
