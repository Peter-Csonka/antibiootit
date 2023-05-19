package fi.tuni.koodimankelit.antibiootit.controller;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.ArrayList;

import fi.tuni.koodimankelit.antibiootit.database.data.DiagnosisInfo;
import fi.tuni.koodimankelit.antibiootit.exceptions.DiagnosisNotFoundException;
import fi.tuni.koodimankelit.antibiootit.exceptions.InvalidParameterException;
import fi.tuni.koodimankelit.antibiootit.models.AccurateDosageResult;
import fi.tuni.koodimankelit.antibiootit.models.AntibioticTreatment;
import fi.tuni.koodimankelit.antibiootit.models.DiagnosisResponse;
import fi.tuni.koodimankelit.antibiootit.models.DosageFormula;
import fi.tuni.koodimankelit.antibiootit.models.DosageResult;
import fi.tuni.koodimankelit.antibiootit.models.Formula;
import fi.tuni.koodimankelit.antibiootit.models.Measurement;
import fi.tuni.koodimankelit.antibiootit.models.StrengthMeasurement;
import fi.tuni.koodimankelit.antibiootit.models.request.InfectionSelection;
import fi.tuni.koodimankelit.antibiootit.models.request.Parameters;



/**
 * Tests /dose-calculation endpoint HTTP requests and responses
 */
public class DoseCalculationTest extends AntibioticsControllerTest {

    private static final Parameters mockParameters = new Parameters("J03.0", 35.5, false, new ArrayList<InfectionSelection>());
    private static final String ADDRESS = "/api/antibiotics/dose-calculation";

    @Test
    public void validParametersShouldReturn200() throws Exception {

        // Mock needed methods
        when(service.calculateTreatments(any()))
        .thenReturn(
            new DiagnosisResponse("diagnosisResponseID", "etiology", "description")
        );

        when(service.getDiagnosisInfoByID(any()))
        .thenReturn(new DiagnosisInfo("diagnosisID", "name", "etiology", new ArrayList<>(), true));

        // Actual test
        request(mockParameters)
        .andExpect(status().isOk())
        .andExpect(jsonPath("$._id").value("diagnosisResponseID"))
        .andExpect(jsonPath("$.etiology").value("etiology"))
        .andReturn();
    }

    @Test
    public void emptyIDShouldReturn400() throws Exception {

        Parameters parameters = new Parameters("", 0.0, false, new ArrayList<>());
        
        request(parameters)
        .andExpect(status().isBadRequest());
    }

    @Test
    public void nullCheckBoxesShouldReturn400() throws Exception {

        Parameters parameters = new Parameters("test", 0.0, false, null);
        
        request(parameters)
        .andExpect(status().isBadRequest());
    }

    @Test
    public void missingWeightShouldReturn400() throws Exception {

        String payload = "{\"diagnosisID\":\"J03.0\",\"penicillinAllergic\":false,\"checkBoxes\":[]}";

        request(payload)
        .andExpect(status().isBadRequest());
    }

    @Test
    public void missingAllergicShouldReturn400() throws Exception {

        String payload = "{\"diagnosisID\":\"J03.0\",\"weight\":0.0,\"checkBoxes\":[]}";

        request(payload)
        .andExpect(status().isBadRequest());
    }

    @Test
    public void stringWeightIsHandledCorrectly() throws Exception {
        when(service.getDiagnosisInfoByID(any())).thenReturn(new DiagnosisInfo(null, null, null, new ArrayList<>(), true));
        when(service.calculateTreatments(new Parameters("J03.0", 10.0, false, new ArrayList<>()))).thenReturn(new DiagnosisResponse(null, null, null));
        String payload = "{\"diagnosisID\":\"J03.0\",\"penicillinAllergic\":false,\"weight\":\"10.0\",\"checkBoxes\":[]}";

        request(payload)
        .andExpect(status().isOk());

    }

    @Test
    public void validatorExceptionShouldReturn400() throws Exception {

        when(service.calculateTreatments(any()))
        .thenReturn(null);

        when(service.getDiagnosisInfoByID(any()))
        .thenReturn(new DiagnosisInfo(null, null, null, null, true));

        Mockito.doThrow(new InvalidParameterException(null)).when(validator).validate(any(), any());

        request(mockParameters)
        .andExpect(status().isBadRequest())
        .andReturn();
    }

    @Test
    public void runtimeExceptionShouldReturn500() throws Exception {

        when(service.getDiagnosisInfoByID(any())).thenThrow(RuntimeException.class);

        request(mockParameters)
        .andExpect(status().isInternalServerError())
        .andReturn();
    }

    @Test
    public void invalidIdShouldReturn404() throws Exception {
        when(service.getDiagnosisInfoByID(any())).thenThrow(DiagnosisNotFoundException.class);

        request(mockParameters)
        .andExpect(status().isNotFound())
        .andReturn();
    }

    @Test
    public void invalidPayloadShouldReturn400() throws Exception {

        String payload = "{\"diagnosisID\":\"J03.0\",\"weight\":0.0,\"checkBoxes\":[]"; // Missing end }

        request(payload)
        .andExpect(status().isBadRequest());
    }

    @Test
    public void dosageFormulaHasAllFields() throws Exception {
        
        DiagnosisResponse response = new DiagnosisResponse(null, null, null);
        response.addTreatment(
            new AntibioticTreatment(null, null, null,
                new DosageFormula(
                    new StrengthMeasurement("mg/ml", 100, "100 mg/ml"),
                    new Measurement("mg/kg/vrk", 80.0)
                ),
                null
            )
        );
        when(service.getDiagnosisInfoByID(any())).thenReturn(new DiagnosisInfo(null, null, null, null, false));
        when(service.calculateTreatments(any())).thenReturn(response);

        request(mockParameters)
        .andExpect(status().isOk())
       
        .andExpect(jsonPath("$.treatments[0].formula.strength").exists())
        .andExpect(jsonPath("$.treatments[0].formula.strength.unit").value("mg/ml"))
        .andExpect(jsonPath("$.treatments[0].formula.strength.value").value(100))
        .andExpect(jsonPath("$.treatments[0].formula.strength.text").value("100 mg/ml"))
        .andExpect(jsonPath("$.treatments[0].formula.dosage").exists())
        .andExpect(jsonPath("$.treatments[0].formula.dosage.unit").value("mg/kg/vrk"))
        .andExpect(jsonPath("$.treatments[0].formula.dosage.value").value(80.0));
    }

    @Test
    public void accurateDosageHasAllFields() throws Exception {
        DiagnosisResponse response = new DiagnosisResponse(null, null, null);
        response.addTreatment(
            new AntibioticTreatment(null, null, null,
                null,
                new AccurateDosageResult(
                    new Measurement("ml", 3.5),
                    new Measurement("ml", 3.457),
                    new Measurement("ml", 3.457)
                )
            )
        );

        when(service.getDiagnosisInfoByID(any())).thenReturn(new DiagnosisInfo(null, null, null, null, false));
        when(service.calculateTreatments(any())).thenReturn(response);

        request(mockParameters)
        .andExpect(status().isOk())

        .andExpect(jsonPath("$.treatments[0].dosageResult.dose").exists())
        .andExpect(jsonPath("$.treatments[0].dosageResult.dose.unit").value("ml"))
        .andExpect(jsonPath("$.treatments[0].dosageResult.dose.value").value(3.5))
        .andExpect(jsonPath("$.treatments[0].dosageResult.accurateDose").exists())
        .andExpect(jsonPath("$.treatments[0].dosageResult.accurateDose.unit").value("ml"))
        .andExpect(jsonPath("$.treatments[0].dosageResult.accurateDose.value").value(3.457));
    }

    @Test
    public void formulaDoesNotHaveExtraFields() throws Exception {
        DiagnosisResponse response = new DiagnosisResponse(null, null, null);
        response.addTreatment(
            new AntibioticTreatment(null, null, null,
                new Formula(
                    new StrengthMeasurement("mg/ml", 100, "100 mg/ml")
                ),
                null
            )
        );
        when(service.getDiagnosisInfoByID(any())).thenReturn(new DiagnosisInfo(null, null, null, null, false));
        when(service.calculateTreatments(any())).thenReturn(response);

        request(mockParameters)
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.treatments[0].formula.strength").exists())
        .andExpect(jsonPath("$.treatments[0].formula.strength.unit").value("mg/ml"))
        .andExpect(jsonPath("$.treatments[0].formula.strength.value").value(100))
        .andExpect(jsonPath("$.treatments[0].formula.strength.text").value("100 mg/ml"))
        .andExpect(jsonPath("$.treatments[0].formula.dosage").doesNotExist());
    }

    @Test
    public void dosageResultDoesNotHaveExtraFields() throws Exception {
        DiagnosisResponse response = new DiagnosisResponse(null, null, null);
        response.addTreatment(
            new AntibioticTreatment(null, null, null,
                null,
                new DosageResult(new Measurement("kpl", 1))
            )
        );
        when(service.getDiagnosisInfoByID(any())).thenReturn(new DiagnosisInfo(null, null, null, null, false));
        when(service.calculateTreatments(any())).thenReturn(response);

        request(mockParameters)
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.treatments[0].dosageResult.dose").exists())
        .andExpect(jsonPath("$.treatments[0].dosageResult.dose.unit").value("kpl"))
        .andExpect(jsonPath("$.treatments[0].dosageResult.dose.value").value(1))
        .andExpect(jsonPath("$.treatments[0].dosageResult.accurateDose").doesNotExist());
    }


    private ResultActions request(Parameters parameters) throws Exception {

        return request(jsonMapper.writeValueAsString(parameters));
    }

    private ResultActions request(String payload) throws Exception {
        return mockMvc.perform(
            post(ADDRESS)
            .headers(getHeaders())
            .contentType(MediaType.APPLICATION_JSON)
            .content(payload)
        );
    }


}
