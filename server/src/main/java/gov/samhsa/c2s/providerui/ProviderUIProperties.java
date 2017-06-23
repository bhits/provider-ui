package gov.samhsa.c2s.providerui;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.validation.Valid;

@Configuration
@ConfigurationProperties(prefix = "c2s.provider-ui")
@Data
public class ProviderUIProperties {
    @Valid
    private ProviderPermissions providerPermissions;

    @Data
    private static class ProviderPermissions {
        @NotBlank
        private boolean isConsentSignEnabled;

        @NotBlank
        private boolean isConsentRevokeEnabled;
    }
}
