describe('' +
  'Teste E2E Versnc Frontend', function () {

    beforeEach(function () {
      // cy.api();
    });

    it('Retorna 200 OK ao acessar a raiz', () => {
      cy.visit('http://localhost:4200/');
    });

    it('Apresenta descrição Consulte seu Estado ou Município', () => {
      cy.visit('http://localhost:4200/home');
      cy.get('app-root snc-busca h4').contains('Consulte seu Estado ou Município');
    });

    it('Apresenta número de municípios aderidos', () => {
      cy.api_count_estados();
      cy.visit('http://localhost:4200/');
      cy.get('.mat-card').eq(0).contains('2730');
    });

    it('Apresenta número de estados aderidos', () => {
      cy.api_count_estados();
      cy.visit('http://localhost:4200/');
      cy.get('.mat-card').eq(1).contains('25');
    });

    it('Apresenta Tabela na Pagina Inicial', () => {
      cy.api();
      cy.visit('http://localhost:4200/');
      cy.get('input').type('{enter}');
      cy.get('app-root snc-table mat-card');
    });

    it('Apresenta título ENTE FEDERADO na tabela da Página Inicial após pesquisa', () => {
      cy.api();
      cy.visit('http://localhost:4200/');
      cy.get('input').type('{enter}');
      cy.get('.mat-sort-header-button').contains('ENTE FEDERADO');
    });

    it('Apresenta título MUNICÍPIO para pesquisa de somente Municípios', () => {
      cy.api();
      cy.visit('http://localhost:4200/');
      cy.get('.alinhamento').eq(1).click();
      cy.get('mat-checkbox').eq(0).click();
      cy.get('input').eq(1).type('{enter}');

      cy.get('.mat-sort-header-button').contains('MUNICÍPIO');
    });

    it('Apresenta título ESTADO para pesquisa de somente Estados', () => {
      cy.api();
      cy.visit('http://localhost:4200/');
      cy.get('.alinhamento').eq(1).click();
      cy.get('mat-checkbox').eq(1).click();
      cy.get('input').eq(1).type('{enter}');

      cy.get('.mat-sort-header-button').contains('ESTADO');
    });

    it('Apresenta título DATA DA ADESÃO na tabela da Página Inicial após pesquisa', () => {
      cy.api();
      cy.visit('http://localhost:4200/');
      cy.get('input').type('{enter}');
      cy.get('.mat-sort-header-button').eq(1).contains('DATA DA ADESÃO');
    });

    it('Apresenta título DETALHAR na tabela da Página Inicial após pesquisa', () => {
      cy.api();
      cy.visit('http://localhost:4200/');
      cy.get('input').type('{enter}');
      cy.get('.mat-header-cell').eq(2).contains('DETALHAR');
    });

    it('Apresenta 10 elementos referentes aos municipios e a linha expansível', () => {
      cy.api();
      cy.visit('http://localhost:4200/');
      cy.get('input').type('{enter}');
      cy.get('app-root snc-table mat-card mat-table mat-row').should('have.length', 10);
    });

    it('Criação de uma nova linha após o click em alguma das linhas da tabela', () => {
      cy.api();
      cy.visit('http://localhost:4200/');
      cy.get('input').type('{enter}')
      cy.wait(50);
      cy.get('mat-table mat-row').eq(0).click();
      cy.get('mat-table div.mat-row');
    });

    it('Apresenta o componente de paginação', () => {
      cy.api();
      cy.visit('http://localhost:4200/');
      cy.get('input').type('{enter}');
      cy.get('app-root snc-table mat-card mat-paginator');
    });

    it('Apresenta dados nas linhas da tabela', () => {
      cy.api();
      cy.visit('http://localhost:4200/tabela-uf-municipio');
      cy.get('app-root snc-table mat-card mat-table mat-row').should('not.be.empty');
    });

    it('Testa pesquisa do Nome do Município na Busca Simples', () => {
      cy.apiSimples();
      cy.visit('http://localhost:4200/');
      cy.get('input').type('Malhada{enter}');
      cy.get('app-root snc-table mat-card mat-table mat-row mat-cell').eq(0).contains('Malhada - BA');
    });

    it('Testa pesquisa do Nome do Município na Busca Simples pelo botão', () => {
      cy.apiSimples();
      cy.visit('http://localhost:4200/');
      cy.get('input').type('Malhada');
      cy.get('.mat-raised-button').click()
      cy.get('app-root snc-table mat-card mat-table mat-row mat-cell').eq(0).contains('Malhada - BA');
    });

    it('Testa pesquisa do Nome do Estado por extenso na Busca Simples', () => {
      cy.api_df();
      cy.visit('http://localhost:4200/');
      cy.get('input').type('Distrito Federal{enter}');
      cy.get('app-root snc-table mat-card mat-table mat-row mat-cell').eq(0).contains('Distrito Federal');
    });

    it('Testa mudança da Busca Simples p/ Busca Avançada após click no botão de Abrir Filtros', () => {
      cy.api();
      cy.visit('http://localhost:4200/');
      cy.get('.alinhamento').eq(1).contains('Abrir Filtros');
    });

    it('Testa input Municipio - Busca Avançada', () => {
      cy.api_municipio_avancada();
      cy.visit('http://localhost:4200/');
      cy.get('.alinhamento').eq(1).click();
      cy.get('input').eq(0).type('Malhada{enter}');

      cy.get('app-root snc-table mat-card mat-table mat-row mat-cell').eq(0).contains('Malhada - BA');
    });

    it('Testa input Municipio - Busca Avançada pelo botão', () => {
      cy.api_municipio_avancada();
      cy.visit('http://localhost:4200/');
      cy.get('.alinhamento').eq(1).click();
      cy.get('input').eq(0).type('Malhada');
      cy.get('.mat-raised-button').click()

      cy.get('app-root snc-table mat-card mat-table mat-row mat-cell').eq(0).contains('Malhada - BA');
    });

    it('Testa select da sigla do Estado - Busca Avançada', () => {
      cy.api_busca_uf_avancada();
      cy.visit('http://localhost:4200/');
      cy.get('.alinhamento').eq(1).click();
      cy.get('.mat-select').click();
      cy.get('[value="DF"]').click();
      cy.get('input').eq(0).type('{enter}');

      cy.get('app-root snc-table mat-card mat-table mat-row mat-cell').eq(0).contains('Distrito Federal');
    });

    it('Testa a pesquisa do nome do Estado por extenso - Busca Avançada ', () => {
      cy.api_busca_estado_avancada();
      cy.visit('http://localhost:4200/');
      cy.get('.alinhamento').eq(1).click();
      cy.get('input').eq(0).type('Distrito Federal{enter}');

      cy.get('app-root snc-table mat-card mat-table mat-row mat-cell').eq(0).contains('Distrito Federal');
    });

    it('Testa retorno de SOMENTE MUNÌCIPIOS na busca Avançada', () => {
      cy.api_somente_municipios();
      cy.visit('http://localhost:4200/');
      cy.get('.alinhamento').eq(1).click();
      cy.get('mat-checkbox').eq(0).click();

      cy.get('input').eq(0).type('{enter}');

      cy.get('app-root snc-table mat-card mat-table mat-row').eq(0).contains('Abaetetuba - PA');
      cy.get('app-root snc-table mat-card mat-table mat-row').eq(1).contains('Abaiara - CE');
    });

    it('Testa retorno de SOMENTE ESTADOS na busca Avançada', () => {
      cy.api_somente_estados();
      cy.visit('http://localhost:4200/');
      cy.get('.alinhamento').eq(1).click();
      cy.get('mat-checkbox').eq(1).click();

      cy.get('input').eq(0).type('{enter}');

      cy.get('app-root snc-table mat-card mat-table mat-row').eq(0).contains('Acre');
      cy.get('app-root snc-table mat-card mat-table mat-row').eq(1).contains('Alagoas');
    });

    it('Testa a opção de ADESÃO A PARTIR DE, na Busca Avançada', () => {
      cy.api_data_adesao_min();
      cy.visit('http://localhost:4200/');
      cy.get('.alinhamento').eq(1).click();

      cy.get('input').eq(1).type('11/10/2017{enter}');
      cy.get('app-root snc-table mat-card mat-table mat-row mat-cell').eq(0).contains('Afrânio - PE');
    });

    it('Testa a opção de ADESÃO ATÉ A DATA, na Busca Avançada', () => {
      cy.api_data_adesao_max();
      cy.visit('http://localhost:4200/');
      cy.get('.alinhamento').eq(1).click();

      cy.get('input').eq(2).type('1/1/2016{enter}');
      cy.get('app-root snc-table mat-card mat-table mat-row mat-cell').eq(0).contains('Abaetetuba - PA');
    });

    it('Testa ordenação alfabética ASC da tabela ao clicar no titulo ENTE FEDERADO', () => {
      cy.api();
      cy.visit('http://localhost:4200/');
      cy.get('input').type('{enter}');
      cy.get('.mat-sort-header-button').eq(0).contains('ENTE FEDERADO').click({ force: true });

      cy.get('mat-cell').eq(0).contains('Abaetetuba - PA');
    });

    it('Testa ordenação alfabética DESC da tabela ao clicar no titulo ENTE FEDERADO', () => {
      cy.api();
      cy.visit('http://localhost:4200/');
      cy.get('input').type('{enter}');
      cy.wait(50);
      cy.get('.mat-sort-header-button').eq(0).contains('ENTE FEDERADO').click().click()
      cy.get('mat-cell').eq(0).contains('Acaraú - CE');
    });

    it('Testa se a quantidade de municípios retornados pela busca está correto na descrição abaixo da tabela', () => {
      cy.api();
      cy.visit('http://localhost:4200/tabela-uf-municipio');
      cy.get('input').type('{enter}');

      cy.get('div h3.total').eq(1).contains('Municípios: 2730');
    });

    it('Testa se a quantidade de estados retornados pela busca está correto na descrição abaixo da tabela', () => {
      cy.api();
      cy.visit('http://localhost:4200/tabela-uf-municipio');
      cy.get('input').type('{enter}');

      cy.get('div h3.total').eq(0).contains('Estados: 25');
    });

    it('Testa linha expansível com situações positivas', () => {
      cy.api_linha_expansivel();
      cy.visit('http://localhost:4200/');
      cy.get('input').type('{enter}');
      cy.wait(50);
      cy.get('mat-row').eq(0).click();

      cy.get('div.mat-table').should('be.visible');
      cy.get('div.mat-row').contains('Sistema de Cultura');
      cy.get('div.mat-row').contains('Órgão Gestor');
      cy.get('div.mat-row').contains('Conselho de Política Cultural');
      cy.get('div.mat-row').contains('Fundo de Cultura');
      cy.get('div.mat-row').contains('Plano de Cultura');
      cy.get('div.mat-row div.mat-cell').eq(3).contains('check_circle');
      cy.get('div.mat-row div.mat-cell p').eq(1).contains('Concluída');

      cy.get('mat-row').eq(0).click();
      cy.get('div.mat-table').should('not.be.visible');
    });

    it('Testa linha expansível com situações negativas', () => {
      cy.api_linha_expansivel();
      cy.visit('http://localhost:4200/tabela-uf-municipio');
      cy.get('input').type('{enter}');
      cy.wait(50);
      cy.get('mat-row').eq(0).click();

      cy.get('div.mat-table').should('be.visible');
      cy.get('div.mat-row').contains('Sistema de Cultura');
      cy.get('div.mat-row').contains('Órgão Gestor');
      cy.get('div.mat-row').contains('Conselho de Política Cultural');
      cy.get('div.mat-row').contains('Fundo de Cultura');
      cy.get('div.mat-row').contains('Plano de Cultura');

      cy.get('div.mat-row div.mat-cell').eq(1).contains('cancel');
      cy.get('div.mat-row div.mat-cell p').eq(0).contains('Arquivo danificado')

      cy.get('mat-row').eq(0).click();
      cy.get('div.mat-table').should('not.be.visible');

    });

    it('Testa filtro de componentes com checkboxs ativos', () => {
      cy.api_componentes();
      cy.visit('http://localhost:4200/tabela-uf-municipio');
      cy.get('.alinhamento').eq(1).click();

      cy.get('.mat-checkbox-input').eq(2).click({ force: true });
      cy.get('.mat-checkbox-input').eq(3).click({ force: true });
      cy.get('.mat-checkbox-input').eq(4).click({ force: true });
      cy.get('.mat-checkbox-input').eq(5).click({ force: true });
      cy.get('.mat-checkbox-input').eq(6).click({ force: true });

      cy.get('input').eq(1).type('{enter}');

      cy.get('.alinhamento').eq(1).click();

      cy.wait('@componentes')

      cy.get('mat-table').children('mat-row').each(($el, index, $list) => {
        cy.wrap($el).click();
        cy.get('div.mat-row').contains('Sistema de Cultura');
        cy.get('div.mat-row').contains('Órgão Gestor');
        cy.get('div.mat-row').contains('Conselho de Política Cultural');
        cy.get('div.mat-row').contains('Fundo de Cultura');
        cy.get('div.mat-row').contains('Plano de Cultura');
        cy.get('div.mat-row div.mat-cell').contains('check_circle');

      });
  });
