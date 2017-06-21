# Provider User Interface

The Provider User Interface (provider-ui) is a provider user interface component of Consent2Share used to create and manage patient accounts. Provider can use this to log in, visit their home page, create patient accounts, and manage patient consents.

## Build

### Prerequisites

+ [Oracle Java JDK 8 with Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
+ [Docker Engine](https://docs.docker.com/engine/installation/) (for building a Docker image from the project)
+ [Node.js](https://nodejs.org/en/) (Optional, *see [Structure](#structure) for details*)
+ [Angular CLI](https://github.com/angular/angular-cli) (Optional, *see [Structure](#structure) for details*)
+ [MD2](https://github.com/Promact/md2) (Optional, *see [Structure](#structure) for details*)

### Structure

There are two main modules in this project:

+ `client`: This folder contains all frontend user interface code, which is written using [Angular](https://angular.io/) V4.0.
+ `server`: This folder contains a [Spring Boot](http://projects.spring.io/spring-boot/) project, which is primarily responsible for packaging and serving the static resources that are built from the `client` module. This is also an [Apache Maven](https://maven.apache.org/) project which utilizes [Frontend Maven Plugin](https://github.com/eirslett/frontend-maven-plugin) to: 
    1. locally install [Node.js](https://nodejs.org/en/) and the `client` module Node.js dependencies; 
    2. Build the `client` module using Node Package Manager [NPM](https://www.npmjs.com/) Node.js package. Finally, it uses [Apache Maven Resources Plugin](https://maven.apache.org/plugins/maven-resources-plugin/) to copy the resources that are built from the `client` module into the `server` module that will be eventually packaged as a build artifact in `jar` format. Therefore, there is no need to install Node.js globally if `server` module is built with Maven.
+ Angular CLI and MD2 are required only during development. It is not required to install them if you're only running the application out of the box.
      
### Commands

This Maven project requires [Apache Maven](https://maven.apache.org/) 3.3.3 or greater to build it. It is recommended to use the *Maven Wrapper* scripts provided with this project. *Maven Wrapper* requires an internet connection to download Maven and project dependencies for the very first build.

To build the project, navigate to the folder that contains `pom.xml` file using the terminal/command line.

+ To build a JAR:
    + For Windows, run `mvnw.cmd clean install`
    + For *nix systems, run `mvnw clean install`
+ To build a Docker Image (this will create an image with `bhitsdev/provider-ui:latest` tag):
    + For Windows, run `mvnw.cmd clean package docker:build`
    + For *nix systems, run `mvnw clean package docker:build`

Note: Frontend developers can build `client` and `server` modules separately and save build time by using Angular CLI. This option requires [Angular CLI](http://gruntjs.com/) to be installed globally.


1. Build the `client` module: *run `npm run prod` in the client folder*
2. Manually repackage the `jar` file from the `server` module 


## Run

### Commands

This is a [Spring Boot](https://projects.spring.io/spring-boot/) project and serves the project via an embedded Tomcat instance. Therefore there is no need for a separate application server to run it.

+ Run as a JAR file: `java -jar provider-ui-x.x.x-SNAPSHOT.jar <additional program arguments>`
+ Run as a Docker Container: `docker run -d bhitsdev/provider-ui:latest <additional program arguments>`

*NOTE: In order for this project to fully function as a microservice in the Consent2Share application, it is required to setup the dependency microservices and the support level infrastructure. Please refer to the Consent2Share Deployment Guide in the corresponding Consent2Share release (see [Consent2Share Releases Page](https://github.com/bhits-dev/consent2share/releases)) for instructions to setup the Consent2Share infrastructure.*

## Debug TypeScript


During the build, [Angular-Cli](https://github.com/angular/angular-cli) uses [Webpack](https://webpack.github.io/) to create bundles (Javascript files) which will be referenced in the browser.
Run the application and use browser development tools to set breakpoints in related Javascript files to start debugging.
 
## Configure

The `server` module runs with some default configuration that is primarily targeted for development environment. It utilizes [`Configuration Server`](https://github.com/bhits-dev/config-server) which is based on [Spring Cloud Config](https://github.com/spring-cloud/spring-cloud-config) to manage externalized configuration, which is stored in a `Configuration Data Git Repository`. We provide a [`Default Configuration Data Git Repository`]( https://github.com/bhits-dev/c2s-config-data).

This API can run with the default configuration, which is targeted for a local development environment. Default configuration data is from three places: `bootstrap.yml`, `application.yml`, and the data which `Configuration Server` reads from `Configuration Data Git Repository`. Both `bootstrap.yml` and `application.yml` files are located in the `resources` folder of this source code.

We **recommend** overriding the configuration as needed in the `Configuration Data Git Repository`, which is used by the `Configuration Server`.

Also, please refer to [Spring Cloud Config Documentation](https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html) to see how the config server works, [Spring Boot Externalized Configuration](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html) documentation to see how Spring Boot applies the order to load the properties, and [Spring Boot Common Properties](http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html) documentation to see the common properties used by Spring Boot.

### Other Ways to Override Configuration

### Override a Configuration Using Program Arguments While Running as a JAR:

+ `java -jar provider-ui-x.x.x-SNAPSHOT.jar --c2s.provider-ui.oauth2.client.secret=strongpassword`

*NOTE: The `oauth2.client.client-id` and `oauth2.client.secret` value are used for [User Account and Authentication (UAA) Password Grant type](http://docs.cloudfoundry.org/api/uaa/#password-grant). The configuration uses the format `client_id:client_secret` to be Base 64 encoded. The `client_id` refers to the OAuth2 Client ID assigned to the Consent2Share UI by [UAA](https://docs.cloudfoundry.org/concepts/architecture/uaa.html). Consent2Share uses `provider-ui` as the default `client_id` for this application.*

### Override a Configuration Using Program Arguments While Running as a Docker Container:

+ `docker run -d bhitsdev/provider-ui:latest --c2s.provider-ui.oauth2.client.secret=strongpassword`

+ In a `docker-compose.yml`, this can be provided as:
```yml
version: '2'
services:
...
  provider-ui.c2s.com:
    image: "bhitsdev/provider-ui:latest"
    command: ["--c2s.provider-ui.oauth2.client.secret=strongpassword"]
...
```

### Enable SSL

For simplicity in development and testing environments, SSL is **NOT** enabled by default configuration. SSL can easily be enabled by following the examples below:

#### Enable SSL While Running as a JAR

+ `java -jar provider-ui-x.x.x-SNAPSHOT.jar --spring.profiles.active=ssl --server.ssl.key-store=/path/to/ssl_keystore.keystore --server.ssl.key-store-password=strongkeystorepassword`

#### Enable SSL While Running as a Docker Container

+ `docker run -d -v "/path/on/dockerhost/ssl_keystore.keystore:/path/to/ssl_keystore.keystore" bhitsdev/provider-ui:latest --spring.profiles.active=ssl --server.ssl.key-store=/path/to/ssl_keystore.keystore --server.ssl.key-store-password=strongkeystorepassword`
+ In the `docker-compose.yml`, this can be provided as:
```yml
...
  provider-ui.c2s.com:
    image: "bhitsdev/provider-ui:latest"
    command: ["--spring.profiles.active=ssl","--server.ssl.key-store=/path/to/ssl_keystore.keystore", "--server.ssl.key-store-password=strongkeystorepassword"]
    volumes:
      - /path/on/dockerhost/ssl_keystore.keystore:/path/to/ssl_keystore.keystore
...
```

*NOTE: As seen in the examples above, `/path/to/ssl_keystore.keystore` is made available to the container via a volume mounted from the Docker host running this container.*

### Override Java CA Certificates Store In Docker Environment

Java has a default CA Certificates Store that allows it to trust well-known certificate authorities. For development and testing purposes, one might want to trust additional self-signed certificates. In order to override the default Java CA Certificates Store in Docker container, one can mount a custom `cacerts` file over the default one in the Docker image as follows: `docker run -d -v "/path/on/dockerhost/to/custom/cacerts:/etc/ssl/certs/java/cacerts" bhitsdev/provider-ui:latest`

*NOTE: The `cacerts` references given regarding volume mapping above are files, not directories.*

### Default Provider user

For demo purpose, the system has a default provider user configured in [User Account and Authentication (UAA)](http://docs.cloudfoundry.org/api/uaa/) uaa.yml file. The default account can be modified or/and create more users.
```yml
...
scim:
  users:
#  Configure Additional Consent2Share Provider User As:
#    - EmailId | password | EmailId | FirstName | LastName | <Comma saperated list of permissions>
#  For example:
    - c2s-provider@mailinator.com|AAA#aaa1|c2s-provider@mailinator.com|provider|consent2share|providerUi.access,providerUiApi.read,providerUiApi.write
...
```

[//]: # (## API Documentation)

[//]: # (## Notes)

[//]: # (## Contribute)

## Contact
If you have any questions, comments, or concerns please see [Consent2Share](https://bhits-dev.github.io/consent2share/) project site.

## Report Issues
Please use [GitHub Issues](https://github.com/bhits-dev/provider-ui/issues) page to report issues.

[//]: # (License)
