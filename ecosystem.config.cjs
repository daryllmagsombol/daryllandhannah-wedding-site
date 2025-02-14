module.exports = {
    apps: [
      {
        name: 'daryllandadmin1',
        script: 'bin/server.js',
        instances: 'max',
        exec_mode: 'cluster',
        autorestart: true,
      },
    ],
  }