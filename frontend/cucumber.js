module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/bdd/step_definitions/**/*.ts'],
    paths: ['tests/bdd/features/**/*.feature'],
    publishQuiet: true,
    format: ['progress', 'summary']
  }
};
