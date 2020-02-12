/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const { Seeder } = require("mongo-seeding");

const config = {
  database: {
    host: "127.0.0.1",
    port: 27017,
    name: "evaluator-test"
  },
  dropDatabase: false
};

const seeder = new Seeder(config);

module.exports = (on, _config) => {
  on("task", {
    seed: async ({ collection, documents }) => {
      const documentsArray = [documents].flat();

      try {
        await seeder.import([{ name: collection, documents: documentsArray }]);
      } catch (error) {
        console.log(error);
      }

      return null;
    }
  });

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};
