package gov.samhsa.c2s.providerui;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfigRestController {
    private final ProviderUIProperties provideruiProperties;

    @Autowired
    public ConfigRestController(ProviderUIProperties provideruiProperties) {
        this.provideruiProperties = provideruiProperties;
    }

    @RequestMapping(value = "/config", method = RequestMethod.GET)
    public ProviderUIProperties getConfig() {
        return provideruiProperties;
    }
}
