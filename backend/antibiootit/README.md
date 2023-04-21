# Backend - Antibiootit

## Requirements

- Java 17
- Maven 4.0
- Spring 3.0.2
- MongoDB 4.8.2
- springdoc-openapi v2.0.2



## Environment

### Local debugging

Server requires `apikey` variable. In local debugging, it is recommended to be defined in file `src/main/resources/secrets.properties`. It should **not** be added to version control. The value for `apikey` can be found in Railway hosting service.

Server connects to MongoDB hosted in Railway in local debugging mode. It requires `MONGO_URL` environment variable. It is also set in `secrets.properties` file. The value can be found in Railway hosting service.

Below is an example of the contents of `secrets.properties`:

```
apikey=<value>
MONGO_URL=<value>
```

### Hosting service
Required environment variables are set in Railway.

## Running the program
Recommended way to run in debugging mode is to use IDE. Alternative way is to build Maven project and run it.

## Deploying to Railway
CI/CD-pipeline has been set up to deploy changes in `main` branch automatically to Railway. It automatically fetches the codes, builds the server and deploys it automatically. Deployed application is reachable from [api.antibiootit.fi](api.antibiootit.fi) or [via Railway's domain](backend-production-0993.up.railway.app)

## OpenAPI documentation
OpenAPI (Swagger) documentation can be found in [swagger-ui](https://api.antibiootit.fi/swagger-ui/index.html). Authorize by giving the `apikey` (can be found in Railway) in order to try out the endpoints.