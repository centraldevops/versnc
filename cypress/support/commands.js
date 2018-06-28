// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// PARA ABRIR NO MODO WEB O CYPRESS EXECUTE O COMANDO
//
// node_modules/.bin/cypress open
//
//************************************************
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('api', () => {
  cy.server()           // enable response stubbing
  cy.route({
    method: 'GET',      // Route all GET requests
    url: 'http://hmg.snc.cultura.gov.br/api/v1/sistemadeculturalocal/?limit=&offset=&nome_municipio=&estado_sigla=&data_adesao_min=&data_adesao_max=',    // that have a URL that matches '/users/*'
    response: 'fixture:entidadeResponse'        // and force the response to be: []
  })
 });

Cypress.Commands.add('apiSimples', () => {
  cy.server()           // enable response stubbing
  cy.route({
    method: 'GET',      // Route all GET requests
    url: 'http://hmg.snc.cultura.gov.br/api/v1/sistemadeculturalocal/?limit=&offset=&nome_municipio=Malhada&estado_sigla=&data_adesao_min=&data_adesao_max=',    // that have a URL that matches '/users/*'
    response: 'fixture:entidade.json'        // and force the response to be: []
  })
});

Cypress.Commands.add('api_busca_uf', () => {
  cy.server()           // enable response stubbing
  cy.route({
    method: 'GET',      // Route all GET requests
    url: 'http://hmg.snc.cultura.gov.br/api/v1/sistemadeculturalocal/?limit=&offset=&nome_municipio=&estado_sigla=DF&data_adesao_min=&data_adesao_max=',    // that have a URL that matches '/users/*'
    response: 'fixture:entidadeResponse'        // and force the response to be: []
  })
 });

Cypress.Commands.add('api_data_adesao_min', () => {
  cy.server()           // enable response stubbing
  cy.route({
    method: 'GET',      // Route all GET requests
    url: 'http://hmg.snc.cultura.gov.br/api/v1/sistemadeculturalocal/?limit=&offset=&nome_municipio=&estado_sigla=&data_adesao_min=11/10/2017&data_adesao_max=',    // that have a URL that matches '/users/*'
    response: 'fixture:adesao_11-10-2017'        // and force the response to be: []
  })
});

Cypress.Commands.add('api_data_adesao_max', () => {
  cy.server()           // enable response stubbing
  cy.route({
    method: 'GET',      // Route all GET requests
    url: 'http://hmg.snc.cultura.gov.br/api/v1/sistemadeculturalocal/?limit=&offset=&nome_municipio=&estado_sigla=&data_adesao_min=&data_adesao_max=1/1/2016',    // that have a URL that matches '/users/*'
    response: 'fixture:adesao_ate_1-1-2016'        // and force the response to be: []
  })
});