module.exports = {
    apps: [
      {
        name: 'Portfolio',
        script: 'npx',
        args: 'serve -s build',
        env: {
          NODE_ENV: 'production',
          PORT: 3055,
        },
      },
    ],
  };