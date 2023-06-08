package fi.tuni.koodimankelit.antibiootit.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import fi.tuni.koodimankelit.antibiootit.database.data.Antibiotic;
import fi.tuni.koodimankelit.antibiootit.database.data.Diagnosis;
import fi.tuni.koodimankelit.antibiootit.database.data.Instructions;
import fi.tuni.koodimankelit.antibiootit.database.data.Strength;
import fi.tuni.koodimankelit.antibiootit.database.data.Tablet;
import fi.tuni.koodimankelit.antibiootit.database.data.TargetedInfo;
import fi.tuni.koodimankelit.antibiootit.database.data.Treatment;
import fi.tuni.koodimankelit.antibiootit.models.DiagnosisResponse;
import fi.tuni.koodimankelit.antibiootit.models.request.InfectionSelection;
import fi.tuni.koodimankelit.antibiootit.models.request.Parameters;
import fi.tuni.koodimankelit.antibiootit.services.AntibioticsService;
import fi.tuni.koodimankelit.antibiootit.services.DataHandler;


@SpringBootTest
public class AntibioticsServiceTest {

    @MockBean
    private DataHandler dataHandler;

    @Autowired
    private AntibioticsService antibioticsService;

    private List<InfectionSelection> infectionSelections = new ArrayList<>();



    @BeforeEach
    public void setUpDiagnosis() {


        Instructions instructions = new Instructions(10, 1, null, null);
        List<Treatment> treatments = new ArrayList<Treatment>(
            Arrays.asList(
                new Treatment(1, new ArrayList<Antibiotic>(
                    Arrays.asList(
                        new Tablet("not-allergic", null, new ArrayList<Strength>(
                            Arrays.asList(
                                new Strength(100, 0, null, null)
                            )), instructions, 1)
                    )
                )),
                new Treatment(3, new ArrayList<Antibiotic>(
                    Arrays.asList(
                        new Tablet("allergic", null, new ArrayList<Strength>(
                            Arrays.asList(
                                new Strength(100, 0, null, null)
                            )), instructions, 1
                        )
                    )
                ))
            )
        );
        List<TargetedInfo> targetedInfos = new ArrayList<TargetedInfo>();
        when(dataHandler.getDiagnosisById(any())).thenReturn(
            new Diagnosis(null, null, null, null, null, null, treatments, true, targetedInfos)
        );
    }

    @BeforeEach
    public void setUpParameters() {
        infectionSelections.clear();
    }

    /* 
    @Test
    public void anyInfectionReturnsAllergic() {
        infectionSelections.add(new InfectionSelection("test1", false));
        infectionSelections.add(new InfectionSelection("test2", true));
        Parameters parameters = getParameters(false, infectionSelections);
        DiagnosisResponse response = antibioticsService.calculateTreatments(parameters);
        assertEquals(1, response.getTreatments().size());
        assertEquals("allergic", response.getTreatments().get(0).getAntibiotic());

    }

    @Test
    public void allInfectionsTrueReturnsAllergic() {
        infectionSelections = Arrays.asList(
            new InfectionSelection("test1", true),
            new InfectionSelection("test2", true),
            new InfectionSelection("test3", true)
        );

        DiagnosisResponse response = antibioticsService.calculateTreatments(getParameters(false, infectionSelections));
        assertEquals(1, response.getTreatments().size());
        assertEquals("allergic", response.getTreatments().get(0).getAntibiotic());
    } */

    @Test
    public void penicillingAllergicAndAnyInfectionReturnsAllergic() {
        infectionSelections.add(new InfectionSelection("test1", false));
        infectionSelections.add(new InfectionSelection("test2", true));

        DiagnosisResponse response = antibioticsService.calculateTreatments(getParameters(true, infectionSelections));
        assertEquals(1, response.getTreatments().size());
        assertEquals("allergic", response.getTreatments().get(0).getAntibiotic());
    }

    @Test
    public void penicillinAllergicAndNoInfectionsReturnsAllergic() {
        infectionSelections.add(new InfectionSelection("test1", false));
        infectionSelections.add(new InfectionSelection("test2", false));

        DiagnosisResponse response = antibioticsService.calculateTreatments(getParameters(true, infectionSelections));
        assertEquals(1, response.getTreatments().size());
        assertEquals("allergic", response.getTreatments().get(0).getAntibiotic());
    }

    @Test
    public void penicillinAllergicAndEmptyInfectionsReturnsAllergic() {
        
        DiagnosisResponse response = antibioticsService.calculateTreatments(getParameters(true, infectionSelections));
        assertEquals(1, response.getTreatments().size());
        assertEquals("allergic", response.getTreatments().get(0).getAntibiotic());
        
    }

    @Test
    public void allInfectionsFalseReturnsNotAllergic() {
        infectionSelections = Arrays.asList(
            new InfectionSelection("test1", false),
            new InfectionSelection("test2", false),
            new InfectionSelection("test3", false)
        );

        DiagnosisResponse response = antibioticsService.calculateTreatments(getParameters(false, infectionSelections));
        assertEquals(1, response.getTreatments().size());
        assertEquals("not-allergic", response.getTreatments().get(0).getAntibiotic());
    }

    @Test
    public void emptyInfectionsReturnsNotAllergic() {
        infectionSelections.clear();
        DiagnosisResponse response = antibioticsService.calculateTreatments(getParameters(false, infectionSelections));
        assertEquals(1, response.getTreatments().size());
        assertEquals("not-allergic", response.getTreatments().get(0).getAntibiotic());
    }



    private Parameters getParameters(boolean penicillinAllergic, List<InfectionSelection> infectionSelections) {
        return new Parameters(null, 10.0, penicillinAllergic, infectionSelections);
    }


}
