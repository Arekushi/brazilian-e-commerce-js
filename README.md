<h1 align="center">
  Brazilian E-Commerce ETL
</h1>

<p align="center">
  <a href="#" target="blank">
    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/720px-Flag_of_Brazil.svg.png?20111003040251" width="200" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  Simple application in NestJS to perform ETL in the construction of a Data Warehouse on e-commerce sales in Brazil in the period 2016-2018.
</p>

## About The Project
Project of the discipline `Projeto Integrador (Integrator Project)` of the 3º semester of the course of [`Technology in Big Data for Business`][big_data_course] at [`FATEC Ipiranga`][fatec_ipiranga]. Supervised by [`Antonio Guardado`](mailto:antonio.guardado01@fatec.sp.gov.br).

### Portuguese description
A ideia do projeto é fazer a realização de análises sobre uma determinada base de dados e fazer uma apresentação visual dos resultados encontrados.
<br><br>
Foi selecionado a utilização do dataset [`Brazilian E-Commerce Public Dataset by Olist`][dataset], que possui dados históricos de e-commerce no Brasil, no período de 2016 até 2018.


## Built With
- [Node v16.13.1][node16]
- [Typescript 4.7.2][typescript4]
- [NestJS][nestjs]
- [Prisma][prisma]

## Getting Started
For the use of the project, some prerequisites will be necessary.

### Prerequisites
* Node.JS
  1. You can download here: [Node.JS][nodejs_url]
  2. Here is a step-by-step installation tutorial. [(Windows)][nodejs_tutorial_windows] [(Linux)][nodejs_tutorial_linux]
* PostgreSQL _(optional, if you are going to use Docker)_
  1. You can download here: [PostgreSQL][postgresql_url]
  2. Here is a step-by-step installation tutorial. [(Windows)][postgresql_tutorial_windows] [(Linux)][postgresql_tutorial_linux]

* npx
  ```sh
  npm install -g npx
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Arekushi/brazilian-e-commerce-js.git
   ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Create `.env` at project root and add this
    ```env
    DATABASE_URL=postgresql://[user]:[password]@localhost:5432/brazilian_e_commerce
    ```
4. Run in terminal
   ```sh
   npm run command init:main
   ```
5. All ready, the datasets will be downloaded and the inclusion in the database will be done 🎉

## Roadmap
- [x] Creating models in Prisma
- [x] Reading module
  - [x] Abstract base class
  - [x] Read the CSV
  - [x] Perform type transformations (Integer, Float, Date, Boolean)
- [x] Writing module
  - [x] Abstract base class
  - [x] Mapping the database model with the CSV interface 
- [x] CLI module
  - [x] Creating commands for each CSV file
  - [x] Creating a command to download the datasets (CSV files)
    - [x] Download file request 
    - [x] Unzip module 
- [ ]  Test

## Schema
Here is a dictionary of data in a simple Notion document about entities, their attributes and relationships. [(Schema)][schema]

## Acknowledgments
* [O que é DATA WAREHOUSE? Você precisa de um?][datawarehouse_simple_tutorial_video]

## Contributors
| [<div><img width=115 src="https://avatars.githubusercontent.com/u/54884313?v=4"><br><sub>Alexandre Ferreira de Lima</sub></div>][arekushi] |[<div><img width=115 src="https://avatars.githubusercontent.com/u/90634869?v=4"><br><sub>Eduardo Germano de Oliveira</sub></div>][eduardo] |  [<div><img width=115 src="https://avatars.githubusercontent.com/u/90637608?v=4"><br><sub>Gilberto Magalhães</sub></div>][gilberto] | [<div><img width=115 src="https://avatars.githubusercontent.com/u/86978502?v=4"><br><sub>Mychelle Roberto Veloso</sub></div>][mychelle] | [<div><img width=115 src="https://avatars.githubusercontent.com/u/90654164?v=4"><br><sub>Diego Silva Neves</sub></div>][diego] | [<div><img width=115 src="https://avatars.githubusercontent.com/u/91035018?v=4"><br><sub>Ana Carolina Ferreira de Camargo</sub></div>][ana] |
| :---: | :---: | :---: | :---: | :---: | :---: |

<!-- [Build With] -->
[nestjs]: https://nestjs.com/
[prisma]: https://www.prisma.io/
[node16]: https://nodejs.org/dist/latest-v16.x/docs/api/
[typescript4]: https://www.typescriptlang.org/

<!-- [Some links] -->
[schema]: https://arekushi.notion.site/Schema-050137d1ccdf4713a2e0c84cda16d9b7
[dataset]: https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce
[fatec_ipiranga]: https://fatecipiranga.edu.br/
[big_data_course]: https://fatecipiranga.edu.br/curso-superior-de-tecnologia-em-big-data-para-negocios/

[postgresql_url]: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
[postgresql_tutorial_windows]: https://www.guru99.com/download-install-postgresql.html
[postgresql_tutorial_linux]: https://sqlserverguides.com/postgresql-installation-on-linux/

[nodejs_url]: https://nodejs.org/en/download/
[nodejs_tutorial_windows]: https://www.edureka.co/blog/node-js-installation/
[nodejs_tutorial_linux]: https://www.geeksforgeeks.org/installation-of-node-js-on-linux/

<!-- Acknowledgments -->
[datawarehouse_simple_tutorial_video]: https://www.youtube.com/watch?v=Q81zwSmaJo0

<!-- [Constributors] -->
[arekushi]: https://github.com/Arekushi
[eduardo]: https://github.com/EduardoGermanoOliveira
[gilberto]: https://github.com/Gil-BigData
[mychelle]: https://github.com/mychveloso
[diego]: https://github.com/nevesbattousai
[ana]: https://github.com/Anakaita
