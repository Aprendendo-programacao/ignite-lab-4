# Prisma

> ## **Instalação**

1. Instalar o CLI do Prisma:

   ```shell
   $ npm i prisma -D
   ```

2. Instalar o Client do Prisma (produção):

   ```shell
   $ npm i @prisma/client
   ```

> ## **Configuração e criação de tabelas**

3. Criação do banco de dados SQLite:

   ```shell
   $ npx prisma init --datasource-provider SQLite
   ```

   > Outros banco de dados suportados pelo Prisma: [clique aqui](https://www.prisma.io/docs/reference/database-reference/supported-databases)

4. Criação de uma [_schema_](#schema)

5. Criar uma [_migration_](#migrations) para criar a tabela

   ```shell
   $ npx prisma migrate dev
   ```

6. Abrir uma interface (**Prisma Studio**) para visualizar o banco de dados

   ```shell
   $ npx prisma studio
   ```

> ## **_Schema_**

### **Sintaxe**

```
model {
  [nome] [tipo] [constraints]
  // ...
}
```

### **Exemplo**

```
model Notification {
  id          String    @id
  recipientId String
  content     String
  category    String
  readAt      DateTime?
  createdAt   DateTime  @default(now())

  @@index([recipientId])
}
```

> ## **_Migrations_**

### **Definição**

Versionamento dos scripts SQL no bancos de dados
