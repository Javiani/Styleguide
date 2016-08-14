# Índice

- [Ambiente da styleguide](#ambientedastyleguide)
- [Variáveis de Ambiente](#variveisdeambiente)
- [Estrutura de pastas](#estruturadepastas)
- [Api's & Mock Services](#apismockservices)
- [Criação de Componentes](#criaodecomponentes)
- [Arquitetura Css](#arquiteturacss)
- [Arquitetura Javascript](#arquiteturajavascript)

## Ambiente da Styleguide

A aplicação é servida por um servidor [node.js](//nodejs.org), usando [express.js](//expressjs.com/) para as rotas e para servir
os arquivos estáticos.

A StyleGuide roda em cima de um projeto chamado [jerrymice](//github.com/Javiani/JerryMice), que possibilita a construção de Layouts que são modelos padrões de uma página html, contendo os cabeçalhos `<DOCTYPE/>`, `<html />`, `<body />` e quaisquer outras estruturas que sejam recorrentes, e os conteúdos centrais podem ser desenvolvidos de forma independente, apontando para uma **Layout** e reutilizando toda a estrutura já criada.

Os arquivos `.htm` são lidos e renderizados usando a engine de templates [ejs](//www.embeddedjs.com/), já os arquivos `.md` são traduzidos
para o html usando a biblioteca [showdown.js](//github.com/showdownjs/showdown).

A Styleguide utiliza :
- Como Css geral : `assets/dist/css/pages/guideline.css`
- Como Js geral  : `assets/dist/js/guideline.min.js`

Os arquivos `.js` e `.css` de produção não são commitados, e ficam na pasta `/dist`.

---

## Variáveis de Ambiente

Todos os arquivos `.htm` são na verdade templates `ejs`, portanto é possível resgatar valores e programar em node usando
a notação `<% //código %>`. Há algumas variáveis de ambiente que podem ser usadas tanto nos arquivos `.htm` quanto em arquivos `.js` que rodam no servidor node.

### site

A variável `site` inicia como um objeto vazio. Possui duas propriedades utilizadas pelo `jerrymice` :
- **site.layout** : Define qual template o seu conteúdo central irá usar para ser incluído. É necessário definir isso no topo do arquivo `.htm`.

- **site.content** : Deve ser usado no template da sua `layout`. Ele será substituído pelo conteúdo central que também deve fazer referência à um layout como descrito acima.

### data

Uma variável que pode ser usada como variável de sessão, é sempre zerada ao visitar a página, pode ser usado para qualquer fim.

### api( String path )

`api` é uma função que irá procurar na pasta `www/apis` por alguma função ou objeto que poderá servir como `api` tanto
no desenvolvimento dos componentes da página, como também pode ser acessado via serviço **Ajax** ou **Jsonp**.

### request, response
São objetos request/response do próprio `express.js` que são exportados de forma global para poder ser usado tanto nos serviços quanto na própria página `.htm` se for necessário.

### error
Resgata o erro da aplicação caso ocorra. É possível visualizar essa variável no template `error.htm` e `404.htm` na raíz da pasta `views/`.

---

## Estrutura de Pastas

A estrutura de pastas segue a seguinte lógica:

- `assets` : Reside todos os assets do projeto, imagens, css, javascripts, fontes etc.
- `apis` : Guarda todos os arquivos `.js` node que são rodados no server-side.
- `views`  : Possui arquivos `.htm` e `.md` que serão usados para criação dos componentes html e de documentação.
- `views/components` : Pasta que armazena todas as views parciais de componentes, a estrutura de pastas dentro desta pasta componentes pode ser organizada da forma que for mais conveniente de acordo com o projeto.
- `views/docs`    : Possui todos os markdowns de documentação da Style Guide.
- `views/layouts` : Possui os templates dos layouts que serão utilizados pelos conteúdos centrais.
- `views/pages`   : Possui as páginas finais mock que serão o reflexo das páginas prontas e finais com todos os componentes e conteúdos. Serão os conteúdos centrais do Portal que por sua vez apontarão para algum template da pasta `layouts`.

---

## Apis & Mock Services

As apis são apenas arquivos `.js` que rodam no ambiente `node`. Servem para criar lógica no lado do servidor, criar
mock dinâmicos para ser usados no conteúdo das páginas e também para gerar serviços.

O `jerrymice` automatiza a criação de serviços utilizando a localização das `apis`. Após criar uma api chamada `test.js` por exemplo, na pasta `apis`, basta acessar o seu serviço equivalente em : `/services/test`.

Ele obedece a estrutura de pastas dentro da pasta `apis` portanto para acessar o mesmo serviço usando uma api que reside em `apis/pasta/teste.js`, basta acessar a url :`/services/pasta/teste`.

É possível também requisitar por serviços `jsonp`, apenas adicionando a querystring `?callback=nome-da-funcao`.

Se precisar responder um css, basta responder o header adequado na sua `api`: `response.setHeader('Content-Type', 'text/css');`

---

## Criação de Componentes

A Style guide auxilia no desenvolvimento dos componentes e na automatização das documentações.

Para criar um componente :
- Crie um arquivo `.htm` em `views/components/`, pode ser utilizado qualquer estrutura de pastas nesse contexto.
- Crie um arquivo `.styl` em `styl/components/`, deve ser usado a mesma estrutura de pastas usada no contexto do html.

Para testar o componente criado no ambiente da styleguide, é necessário documentá-lo, usando uma marcação `@markdown` no
comentário do arquivo `.htm`. É possível visualizar como é feita essa marcação abrindo o arquivo `views/components/sample.htm`.

Feito isso, o componente aparecerá na listagem de componentes na Sidebar da Styleguide, basta acessar o link e testar nas diferentes resoluções e dispositivos.

### Recomendação para criação de componentes

É interessante criar os componentes de forma macro antes, pra só quando houver necessidade quebrar em partes menores. Para evitar componentização desnecessária e esforço para resolver problemas que ainda não existem.

---

## Arquitetura Css

A arquitetura Css segue o modelo de componentes do React, onde toda estrutura complexa é uma composição de múltiplos componentes menores.

Quanto à organização dos arquivos:

- Pages : Output do css, é o css que vai ser carregado em uma página. Importa todas as dependências necessárias para uma página funcionar adequadamente.

- Layout : Estrutura/Esqueleto onde os módulos ficarão alojados, templates podem ser reutilizados caso necessário.

- Components : Tudo quanto é módulo é escrito como componentes, dentro deste diretório pode ser criada a estrutura de pastas que for conveniente de acordo com o projeto.
Padrões

Como padrão adotado o [rscss](//rscss.io/) parece ser o mais simples e minimalista, além da curva de aprendizado ser baixa.

---

## Arquitetura Javascript

A arquitetura Javascript usada é a proposta pelo projeto `Jails`.

Toda a documentação para maiores esclarecimentos: [Jails-org](//github.com/Jails-org).
