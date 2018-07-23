import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/';
import { Entidade } from '../models/entidade.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { SncTableComponent } from '../snc-table/snc-table.component';

import { SlcApiService } from '../slc-api.service';

@Component({
  selector: 'snc-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css'],
  providers: [SncTableComponent,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }]
})

export class BuscaComponent implements OnInit {

  private listaRetorno = {};
  private listaEntidades: [Entidade];
  private seletorTipoBusca: boolean = false;
  private termoSimples: String = '';
  private termoUF: String = '';
  private page: number = 0;
  private data_adesao_min: String = "";
  private data_adesao_max: String = "";
  private visualizarEstados = true;
  private visualizarMunicipios = true;

  constructor(private slcApiService: SlcApiService) {
  }

  queries: { [query: string]: String }
    = {
      'limit': '', 'offset': '', 'nome_municipio': '', 'estado_sigla': '', 'data_adesao_min': '', 'data_adesao_max': '',
      'nome_uf': '', 'estadual': '', 'municipal': '', 'ente_federado': ''
    };

  queriesPlanoTrabalho: { [query: string]: String } = {
    'id': '', 'situacao_lei_id': '', 'situacao_plano_id': '', 'situacao_orgao_id': '',
    'situacao_fundo_id': '', 'situacao_conselho_id': ''
  };

  componentes = [false, false, false, false, false]; // leiSistema, OrgaoGestor, PlanoCultura, Fundocultura, ConselhoCultura

  ngOnInit(): void {
    this.slcApiService.buscaAtual.subscribe(listaRetorno => this.listaRetorno = listaRetorno);
  }


  /* AQUI COMEÇA O TESTE DE REFATORAÇÃO DA BUSCA */

  onRealizarBuscaComEnter(event) {
    if (event.keyCode === 13) {
      if (!this.seletorTipoBusca) { // BUSCA SIMPLES
        this.limparQueriesDaBusca();
        this.queries['ente_federado'] = this.termoSimples.length < 3 ? this.termoSimples.toUpperCase() : this.termoSimples;
        this.onRealizarBusca();

      } else { // BUSCA AVANÇADA
        this.pesquisarEstado(this.termoUF);
        this.queries['ente_federado'] = '';
        this.queries['data_adesao_min'] = this.getDatePicker(this.data_adesao_min);
        this.queries['data_adesao_max'] = this.getDatePicker(this.data_adesao_max);
        this.queries['estadual'] = !this.visualizarEstados ? 'false' : '';
        this.queries['municipal'] = !this.visualizarMunicipios ? 'false' : '';
        this.onRealizarBusca();
      }

    }
  }
 
  limparQueriesDaBusca() {
    this.queries['data_adesao_max'] = '';
    this.queries['data_adesao_min'] = '';
    this.queries['estado_sigla'] = '';
    this.queries['nome_uf'] = '';
    this.queries['nome_municipio'] = '';
    this.termoUF = '';
  }

  pesquisarEstado(nome_uf) {
    this.queries['estado_sigla'] = nome_uf.length == 2 ? nome_uf.toUpperCase() : '';
    this.queries['nome_uf'] = nome_uf.length > 2 ? nome_uf : '';
  }

  onRealizarBusca() {
    this.listaEntidades = undefined;
    this.slcApiService['paginaAtual'] = 0; // Garante que a busca sempre seja vista inicialmente na primeira página
    this.slcApiService.carregarPagina(this.page, this.queries);
  }

  getDatePicker(datepicker: String) { // recebe um objeto Datepicker e retorna somente a data
    if (!datepicker) {
      return "";
    }
    else if (datepicker['_i']['date']) {
      var dd = datepicker['_i']['date'];
      var mm = datepicker['_i']['month']; // objeto tem as posições 0-11 por default 
      var yy = datepicker['_i']['year'];

      return (dd + '/' + (mm + 1) + '/' + yy);
    }
    else {
      return datepicker['_i']
    }
  }

}
