module.exports = {
  apps : [{
    name      : 'gq',
    script    : 'app.js',
    instances: 2,
    kill_timeout: 3000,
    wait_ready: true,
    listen_timeout: 300000, // wait for 5 minutes
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '172.31.45.88',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
