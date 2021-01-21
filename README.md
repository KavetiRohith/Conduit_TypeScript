# Conduit - Medium clone based on realworld.io

## Technologies used

1 NodeJS as Platform/Runtime
2 Typescript - Langushe
3 Postges - Database
4 TypeORM - ORM

```Postgres setup
psql -U postgres

psql:
create database conduit;
create user conduit with encrypted password 'conduit';
grant all privileges on database conduit to conduit;
```