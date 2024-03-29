package fi.tuni.koodimankelit.antibiootit.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import fi.tuni.koodimankelit.antibiootit.filter.ApiKeyFilter;

@Configuration
@PropertySource(value = "classpath:secrets.properties", ignoreResourceNotFound = true)
public class ApiKeyConfig {

    @Value("${apikey:NULL}")
    private String apiKeySecret;

    @Bean
    public FilterRegistrationBean<ApiKeyFilter> apiKeyFilter() {
        FilterRegistrationBean<ApiKeyFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new ApiKeyFilter(apiKeySecret));
        registrationBean.addUrlPatterns("/api/antibiotics/*");
        registrationBean.setOrder(2);
        return registrationBean;
    }
}