package io.gravitee.plugin.resource;

import io.gravitee.plugin.resource.helpers.FunctionBuilderException;
import io.gravitee.plugin.resource.helpers.java.JavaFunctionBuilder;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * @author Yann TAVERNIER (yann.tavernier at graviteesource.com)
 * @author GraviteeSource Team
 */
public class AzureFunctionResourceTest {

    private AzureFunctionResourceConfiguration configuration;

    @Before
    public void setUp() {
        configuration = new AzureFunctionResourceConfiguration();
        configuration.setFunctionCode("");
    }

    @Test
    public void run() throws FunctionBuilderException {
        final JavaFunctionBuilder functionBuilder = new JavaFunctionBuilder(configuration);
        functionBuilder.packageFunction();
        functionBuilder.deployFunction();
    }

}