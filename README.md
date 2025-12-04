# 🚀 Projeto Avalia

Este projeto é uma aplicação **Spring Boot** desenvolvida em **Java** com o padrão **Model-View-Controller (MVC)** e utiliza o **Thymeleaf** como motor de template para a interface web. Ele gerencia dados persistidos em um banco de dados **MySQL**.

O nome do projeto no ambiente Eclipse é `projeto-avalia-2.1`.

---

### 🛠️ Tecnologias Utilizadas

O projeto é baseado nas seguintes tecnologias e dependências (conforme o `pom.xml` e a descrição):

* **Linguagem:** Java 17.
* **Framework:** **Spring Boot** (versão 3.5.6 da `parent` POM).
* **Padrão:** **MVC** (Model-View-Controller).
* **Build Tool:** Apache Maven.
* **Banco de Dados:** **MySQL** (Driver `mysql-connector-j`).
* **Servidor Local:** **XAMPP** (para MySQL).
* **Persistência:** **Spring Data JPA** (Hibernate).
* **Segurança:** **Spring Security**.
* **Templates:** **Thymeleaf**.
* **Validação:** Spring Boot Starter Validation.
* **Geração de PDF:** **OpenPDF** (`com.github.librepdf:openpdf`).
* **Plugins de Build:** `spring-boot-maven-plugin` e `org.eclipse.m2e.core.maven2Builder`.
* **DevTools:** `spring-boot-devtools`.

---

### ⚙️ Configuração do Ambiente

Para rodar este projeto, você precisará ter o **Java 17**, o **Maven** e o **XAMPP** instalados.

#### 1. XAMPP e Banco de Dados MySQL

A aplicação espera encontrar um banco de dados MySQL rodando localmente.

* **Instale e Inicie o XAMPP:**
    * Baixe e instale o XAMPP.
    * Abra o **XAMPP Control Panel**.
    * Inicie os módulos **Apache** (opcional) e **MySQL**.

* **Crie o Banco de Dados:**
    * Acesse o **phpMyAdmin** (geralmente em `http://localhost/phpmyadmin`).
    * Crie um novo banco de dados. O nome do banco de dados deve ser configurado no arquivo `application.properties` (ou `application.yml`) do seu projeto.
    * **Observação:** Certifique-se de que a **URL de conexão**, o **nome de usuário** e a **senha** estejam configurados corretamente para corresponder à sua configuração do MySQL no XAMPP (o padrão do XAMPP geralmente é `username=root` e `password=` (vazio)).

#### 2. Configuração de Desenvolvimento (IDE)

O projeto contém arquivos de configuração do Eclipse, indicando que é um projeto de desenvolvimento Java/Maven.

* **Estrutura do `classpath`:** O projeto aponta para as pastas de código-fonte (`src/main/java`, `src/test/java`) e recursos (`src/main/resources`, `src/test/resources`), compilando para os diretórios `target/classes` e `target/test-classes`.

---

### ▶️ Como Executar

Você pode executar a aplicação via IDE (Eclipse, STS) ou via linha de comando com o Maven Wrapper.

#### Opção 1: Via Linha de Comando (Maven Wrapper)

1.  Navegue até o diretório raiz do projeto no seu terminal.
2.  Execute o comando para iniciar a aplicação:

    ```bash
    ./mvnw spring-boot:run
    ```

    * *No Windows, use:* `mvnw.cmd spring-boot:run`.

#### Opção 2: Via IDE (Eclipse/STS)

1.  Importe o projeto no Eclipse como um Projeto Maven Existente.
2.  Execute a classe principal (aquela com a anotação `@SpringBootApplication`) como um **"Java Application"** ou **"Spring Boot App"**.

#### Acesso à Aplicação

Após o servidor iniciar (por padrão, na porta 8080), acesse o link no seu navegador: **`http://localhost:8080`**.

---

### 📝 Estrutura do Projeto (MVC)

O projeto segue a estrutura padrão do Spring Boot com a divisão de responsabilidades do MVC:

* **Model:** Classes de domínio (entidades JPA) e classes de repositório (`JpaRepository`).
* **View:** Arquivos HTML/Thymeleaf localizados em `src/main/resources/templates/`.
* **Controller:** Classes anotadas com `@Controller` (para renderizar Views) e potencialmente `@RestController` (para APIs REST).

### 📦 Perfis de Build Maven

O projeto inclui um perfil Maven chamado `production`.

* **`production`:** Este perfil é configurado para **pular os testes** (`<skipTests>true</skipTests>`) durante o build.

    * **Para usar o perfil:**
        ```bash
        ./mvnw package -Pproduction
        ```

### 🗄️ Arquivos Ignorados (`.gitignore`)

O projeto configura o Git para ignorar arquivos de build, IDEs e dependências baixadas:

* **Arquivos de Build:** `target/`, `target/classes`, `target/test-classes`.
* **Maven Wrapper Jar:** `.mvn/wrapper/maven-wrapper.jar`.
* **IDE (Eclipse/STS):** `.apt_generated`, `.classpath`, `.factorypath`, `.project`, `.settings`, `.springBeans`, `.sts4-cache`.
* **IDE (IntelliJ IDEA):** `.idea`, `*.iws`, `*.iml`, `*.ipr`.
* **IDE (VS Code):** `.vscode/`.
* **Arquivos de Ajuda:** `HELP.md`.
