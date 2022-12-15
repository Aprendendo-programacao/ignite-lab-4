# Fundamentos do Nest.js & Prisma

> ## **Monolitos**

### **Característica**

Único banco de dados e _code base_.

### **Vantagens**

- **Comunicação** entre os componentes **facilitada**

### **Desvantagens**

- **Complexidade** e **alto custo** para escalar a aplicação

- **Forte dependência** entre os componentes -> derrubamento generalizado (em cascata) da aplicação

> ## **Microsserviços**

### **Característica**

**Composição** de vários **serviços** com **responsabilidades bem definidas** na aplicação.

1 banco de dados por aplicação -> **duplicidade de dados**

### **Vantagens**

- **Independência** entre os componentes

### **Desvantagens**

- **Complexidade na comunicação** entre os componentes

  - Comunicação assíncrona = **serviço de mensageria**
