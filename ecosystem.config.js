module.exports = {
  apps : [{
    name: 'django-mb-api',
    script: 'manage.py',
    args: 'runserver 0.0.0.0:3005',
    instances: 1
  }],
};
