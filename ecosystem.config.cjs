module.exports = {
    apps: [
      {
        name: 'daryllandhannah',
        script: 'bin/server.js',
        instances: 'max',
        exec_mode: 'cluster',
        autorestart: true,
      },
    ],
  }