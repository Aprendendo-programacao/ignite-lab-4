# Design de software

> ## **Definição**

O Design de software é uma prática para arquitetar um aplicação a partir das regras de negócios, casos de uso, fluxo de processos, etc.

Tal processo pode se dar por meio de **diagramas**:

- Diagrama de entidade relacionamento

- Diagrama de caso de uso

- Diagrama de sequência

As práticas mais comum para design de software são:

- **Requisitos funcionais**: **funcionalidades** da aplicação

- **Requisitos não funcionais**: são **características** da aplicação que **não interfere nas funcionalidades** da mesma, porém são fundamentais para a sua construção (ex: ferramentas, contextos de desenvolvimento)

- **Regras de negócios**: **possíveis fluxo**s que uma **funcionalidade** pode percorrer

> ## **Entidades**

### **Definição**

As entidades são responsável por conter as regras de negócio da aplicação.

No contexto de uma linguagem orientada a objetos, é amplamente utilizado o conceito de **encapsulamento** (getters e setters).

### **Exemplo**

```ts
export interface NotificationProps {
  recipientId: string;
  content: string;
  category: string;
  readAt?: Date | null; // readAt aceita: Date / null / undefined
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: NotificationProps) {
    this.props = props;
  }

  public get content() {
    return this.props.content;
  }

  public set content(content: string) {
    this.props.content = content;
  }

  public get category() {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }
}
```
