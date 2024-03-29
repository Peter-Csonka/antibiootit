package fi.tuni.koodimankelit.antibiootit.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
@OpenAPIDefinition(security = {@SecurityRequirement(name = "X-API-KEY")})
@SecurityScheme(type = SecuritySchemeType.APIKEY, name = "X-API-KEY", in = SecuritySchemeIn.HEADER)
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                    .title("Antibiotics API")
                    .version("1.0.0")
                    .description(
                    "The Antibiotics API provides accurate and up-to-date information on " +
                    "appropriate antibiotic recommendations for child patients' respiratory tract infections. " +
                    "The information is based on the national Käypähoito treatment recommendations." +
                    "\n\n### Developers\n\nJuho Rantala, juho.a.rantala@tuni.fi" +
                    "\n\nNeera Kiviluoma, neera.kiviluoma@tuni.fi" +
                    "\n\nEveliina Sundberg, eveliina.sundberg@tuni.fi" +
                    "\n\n")
                )
                .externalDocs(new ExternalDocumentation()
                    .description("Käypähoito recommendations")
                    .url("https://www.kaypahoito.fi/")
                );
    }    
}