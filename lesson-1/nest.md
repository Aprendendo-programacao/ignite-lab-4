# NestJS

> ## **Definição**

É uma framework opinativo, ou seja, o Nest fornece aos desenvolvedores alguns padrões de projetos para facilitar a tomada de decisão dos desenvolvimento e obter uma maior produtividade.

> ## **Características**

- Baseado em TypeScript e Decorators

- Arquitetura fornecido pelo NestJS respeitando os princípios do SOLID

  - [**Inversão de dependência**](#inversão-de-dependência)

  - [**Injeção de dependência**](#injeção-de-dependência)

- Arquitetura baseada nas seguintes camadas:

  - **Controller** (`@Controller`): responsável pelo controle de fluxo dos dados (entrada e saída) da aplicação

  - **Service** (`@Service`): engloba todo o resto

  - **Module** (`@Module`): responsável pela configuração do módulo, ou seja, definir _imports_, _controllers_ e _providers_ para a injeção de dependência

    > **OBS**: é possível importar `Modules` dentro de um `Module`

    ```ts
    @Module({
      // ...
    })
    export class HttpModule {}

    @Module({
      import: [HttpModule],
    })
    export class AppModule {}
    ```

    > `AppModule` é o **módulo raiz** da aplicação

> ## **Inversão de dependência**

### **Definição**

Fornecer funcionalidades (dependências) no momento da instanciação da classe.

### **Benefícios**

- **Desacoplamento** na utilização de **serviços externos** (a partir da criação de uma **camada anticorrupção**)

- Facilita a criação de **testes**

### **Exemplos**

```ts
export abstract class MailService {
  abstract sendEmail(): string;
}

@Injectable()
export class SMTPMailService implements MailService {
  sendEmail(): string {
    return "SMTP Mail";
  }
}

@Injectable()
export class PostmarkMailService implements MailService {
  sendEmail(): string {
    return "Postmark Mail";
  }
}

@Controller()
export class AppController {
  constructor(private readonly mailService: MailService) {}

  // ...
}

@Module({
  // ...
  providers: [
    {
      provide: MailService,
      useClass: SMTPMailService, // ou PostmarkMailService,
    },
  ],
})
export class AppModule {}
```

> Essa flexibilidade na mudação de `SMTPMailService` para `PostmarkMailService` e vice versa é possível por causa da **inversão de dependência** e do **polimorfismo** fornecido pelo TypeScript

### **OBS**

É possível especificar as classes que o NestJS deve injetar de 2 formas:

1. Para classes abstratas:

   ```ts
   providers: [
     {
       provide: // classe abstrata,
       useClass: // implementação,
     },
   ],
   ```

2. Para interfaces e classes concretas:

   ```ts
   providers: [
     // interface,
     // classe concreta
   ],
   ```

> ## **Injeção de dependência**

### **Definição**

Automatização no processo de inserção de dependências no momento de instanciar a classe (por meio do decorator `@Injectable`)

### **Exemplo**

```ts
@Injectable()
export class SMTPMailService {
  sendEmail(): string {
    return "SMTP Mail";
  }
}

@Module({
  // ...
  providers: [SMTPMailService],
})
```

> ## **Validação de dados**

### **Instalação e configurações**

1. Instalação dos pacotes de validation do NestJS

   ```shell
   $ npm i class-validator class-transformer
   ```

2. Notificar o NestJs para realizar a validação nas requisições

   ```ts
   // main.ts

   app.useGlobalPipes(new ValidationPipe());
   ```
