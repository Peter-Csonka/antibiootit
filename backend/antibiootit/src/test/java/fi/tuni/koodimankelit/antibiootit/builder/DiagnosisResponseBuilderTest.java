package fi.tuni.koodimankelit.antibiootit.builder;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import fi.tuni.koodimankelit.antibiootit.database.data.Antibiotic;
import fi.tuni.koodimankelit.antibiootit.database.data.CheckBoxInfo;
import fi.tuni.koodimankelit.antibiootit.database.data.Diagnosis;
import fi.tuni.koodimankelit.antibiootit.database.data.Dosage;
import fi.tuni.koodimankelit.antibiootit.database.data.Instructions;
import fi.tuni.koodimankelit.antibiootit.database.data.Mixture;
import fi.tuni.koodimankelit.antibiootit.database.data.Strength;
import fi.tuni.koodimankelit.antibiootit.database.data.Tablet;
import fi.tuni.koodimankelit.antibiootit.database.data.TargetedInfo;
import fi.tuni.koodimankelit.antibiootit.database.data.Treatment;
import fi.tuni.koodimankelit.antibiootit.exceptions.NoAntibioticTreatmentException;
import fi.tuni.koodimankelit.antibiootit.exceptions.TreatmentNotFoundException;
import fi.tuni.koodimankelit.antibiootit.models.AccurateDosageResult;
import fi.tuni.koodimankelit.antibiootit.models.AntibioticTreatment;
import fi.tuni.koodimankelit.antibiootit.models.DiagnosisResponse;
import fi.tuni.koodimankelit.antibiootit.models.DosageFormula;
import fi.tuni.koodimankelit.antibiootit.models.DosageResult;
import fi.tuni.koodimankelit.antibiootit.models.Formula;

public class DiagnosisResponseBuilderTest {
    
    private final String id = "id";
    private final String name = "name";
    private final String etiology = "etiology";
    private final String info = "info";
    private final String infectionType = "infectionType";
    private final boolean needsAntibiotics = false;

    private final List<CheckBoxInfo> checkBoxInfos = new ArrayList<>();
    private final List<Treatment> treatments = new ArrayList<>();
    private final List<TargetedInfo> targetedInfos = new ArrayList<>();

    private final Diagnosis diagnosis = new Diagnosis(
        id, name, etiology, info, infectionType, checkBoxInfos, treatments, needsAntibiotics, targetedInfos);


    @BeforeEach
    public void populateCheckBoxInfos() {
        checkBoxInfos.clear();
        checkBoxInfos.add(new CheckBoxInfo("id-001", "infection1"));
        checkBoxInfos.add(new CheckBoxInfo("id-002", "infection2"));
    }

    @BeforeEach
    public void populateTreatments() {
        treatments.clear();
        List<Antibiotic> antibiotics1 = new ArrayList<>(
            Arrays.asList(
                generateMixture(
                    "antibiotic1-1", new ArrayList<Strength>(
                        Arrays.asList(
                            new Strength(100, 0, null, null),
                            new Strength(200, 20, null, null)
                        )
                    )
                ),
                generateTablet(
                    "antibiotic1-2", new ArrayList<Strength>(
                        Arrays.asList(
                            new Strength(1000000, 40, null, null),
                            new Strength(1500000, 50, null, null),
                            new Strength(2000000, 60, null, null)
                        )
                    )
                )
            )
        );
        treatments.add(new Treatment(1, antibiotics1));

        List<Antibiotic> antibiotics2 = new ArrayList<>(
            Arrays.asList(
                generateMixture(
                    "antibiotic2-1", new ArrayList<Strength>(
                        Arrays.asList(
                            new Strength(50, 0, null, null),
                            new Strength(100, 10, null, null)
                        )
                    )
                ),
                generateTablet(
                    "antibiotic2-2", new ArrayList<Strength>(
                        Arrays.asList(
                            new Strength(500, 40, null, null),
                            new Strength(750, 60, null, null)
                        )
                    )
                )
            )
        );
        treatments.add(new Treatment(2, antibiotics2));

        List<Antibiotic> antibiotics3 = new ArrayList<>(
            Arrays.asList(
                generateMixture(
                    "antibiotic3-1", new ArrayList<Strength>(
                        Arrays.asList(
                            new Strength(50, 0, null, null),
                            new Strength(100, 10, null, null)
                        )
                    )
                ),
                generateTablet(
                    "antibiotic3-2", new ArrayList<Strength>(
                        Arrays.asList(
                            new Strength(500, 40, null, null),
                            new Strength(750, 60, null, null)
                        )
                    )
                )
            )
        );
        treatments.add(new Treatment(3, antibiotics3));
        
    }

    @Test
    public void allergyIsTreatment3() {
        DiagnosisResponseBuilder builder = new DiagnosisResponseBuilder(diagnosis, 10, true);
        DiagnosisResponse response = builder.build();

        // Choice 3 because penicillin allergy
        // Mixture (antibiotic3-1) because weight 10 kg
        assertEquals(1, response.getTreatments().size());
        assertEquals("antibiotic3-1", response.getTreatments().get(0).getAntibiotic());
    }

    @Test
    public void testNoTreatment() {
        Diagnosis noAntibioticDiagnosis = diagnosis;
        noAntibioticDiagnosis.getTreatments().clear();
        DiagnosisResponseBuilder builder = new DiagnosisResponseBuilder(noAntibioticDiagnosis, 10, false);

        assertThrows(NoAntibioticTreatmentException.class, () -> builder.build());
    }

    @Test
    public void testLabels() {
        DiagnosisResponseBuilder builder = new DiagnosisResponseBuilder(diagnosis, 10, false);
        DiagnosisResponse response = builder.build();

        assertEquals(id, response.getId());
        assertEquals(etiology, response.getEtiology());
        assertEquals(info, response.getDescription());
    }

    @Test
    public void testCorrectAmountOfTreatments() {
        
        DiagnosisResponseBuilder builder;
        DiagnosisResponse response;
        
        // normal: should be 2 treatments
        builder = new DiagnosisResponseBuilder(diagnosis, 10, false);
        response = builder.build();
        assertEquals(2, response.getTreatments().size());

        // allergic: should be 1 treatment
        builder = new DiagnosisResponseBuilder(diagnosis, 10, true);
        response = builder.build();
        assertEquals(1, response.getTreatments().size());

    }

    @Test
    public void testMixtures() {
        DiagnosisResponseBuilder builder = new DiagnosisResponseBuilder(diagnosis, 10, false);
        DiagnosisResponse response = builder.build();

        // 10 kg -> Mixtures for both treatments
        AntibioticTreatment treatment1 = response.getTreatments().get(0);
        AntibioticTreatment treatment2 = response.getTreatments().get(1);
        assertEquals("antibiotic1-1", treatment1.getAntibiotic());
        assertEquals("antibiotic2-1", treatment2.getAntibiotic());

        // Mixture's AntibioticTreatment has DosageFormula and AccurateDosageResult
        assertEquals(DosageFormula.class, treatment1.getFormula().getClass());
        assertEquals(DosageFormula.class, treatment2.getFormula().getClass());
        assertEquals(AccurateDosageResult.class, treatment1.getDosageResult().getClass());
        assertEquals(AccurateDosageResult.class, treatment2.getDosageResult().getClass());
        
    }

    @Test
    public void testTablets() {
        DiagnosisResponseBuilder builder = new DiagnosisResponseBuilder(diagnosis, 50, false);
        DiagnosisResponse response = builder.build();

        // 50 kg -> Tablets for both treatments
        AntibioticTreatment treatment1 = response.getTreatments().get(0);
        AntibioticTreatment treatment2 = response.getTreatments().get(1);
        assertEquals("antibiotic1-2", treatment1.getAntibiotic());
        assertEquals("antibiotic2-2", treatment2.getAntibiotic());

        // Mixture's AntibioticTreatment has DosageFormula and AccurateDosageResult
        assertEquals(Formula.class, treatment1.getFormula().getClass());
        assertEquals(Formula.class, treatment2.getFormula().getClass());
        assertEquals(DosageResult.class, treatment1.getDosageResult().getClass());
        assertEquals(DosageResult.class, treatment2.getDosageResult().getClass());
    }

    @Test
    public void correctStrengthIsChosen() {

        DiagnosisResponseBuilder builder;
        DiagnosisResponse response;

        // Mixture

        // 5kg -> 1: strength 100, 2: strength 50
        builder = new DiagnosisResponseBuilder(diagnosis, 5, false);
        response = builder.build();
        assertEquals("antibiotic1-1", response.getTreatments().get(0).getAntibiotic());
        assertEquals("antibiotic2-1", response.getTreatments().get(1).getAntibiotic());
        assertEquals(100, response.getTreatments().get(0).getFormula().getStrength().getValue());
        assertEquals(50, response.getTreatments().get(1).getFormula().getStrength().getValue());

        // 10kg -> 1: strenght 100, 2: strength 100
        builder = new DiagnosisResponseBuilder(diagnosis, 10, false);
        response = builder.build();
        assertEquals("antibiotic1-1", response.getTreatments().get(0).getAntibiotic());
        assertEquals("antibiotic2-1", response.getTreatments().get(1).getAntibiotic());
        assertEquals(100, response.getTreatments().get(0).getFormula().getStrength().getValue());
        assertEquals(100, response.getTreatments().get(1).getFormula().getStrength().getValue());

        // 20kg -> 1: strenght 200, 2: strength 100
        builder = new DiagnosisResponseBuilder(diagnosis, 20, false);
        response = builder.build();
        assertEquals("antibiotic1-1", response.getTreatments().get(0).getAntibiotic());
        assertEquals("antibiotic2-1", response.getTreatments().get(1).getAntibiotic());
        assertEquals(200, response.getTreatments().get(0).getFormula().getStrength().getValue());
        assertEquals(100, response.getTreatments().get(1).getFormula().getStrength().getValue());

        // 39.99kg -> same as previous
        builder = new DiagnosisResponseBuilder(diagnosis, 39.99, false);
        response = builder.build();
        assertEquals("antibiotic1-1", response.getTreatments().get(0).getAntibiotic());
        assertEquals("antibiotic2-1", response.getTreatments().get(1).getAntibiotic());
        assertEquals(200, response.getTreatments().get(0).getFormula().getStrength().getValue());
        assertEquals(100, response.getTreatments().get(1).getFormula().getStrength().getValue());

        // Tablet

        // 40kg -> 1: strenght 1000000, 2: strength 500
        builder = new DiagnosisResponseBuilder(diagnosis, 40, false);
        response = builder.build();
        assertEquals("antibiotic1-2", response.getTreatments().get(0).getAntibiotic());
        assertEquals("antibiotic2-2", response.getTreatments().get(1).getAntibiotic());
        assertEquals(1000000, response.getTreatments().get(0).getFormula().getStrength().getValue());
        assertEquals(500, response.getTreatments().get(1).getFormula().getStrength().getValue());

        // 50kg -> 1: strenght 1500000, 2: strength 500
        builder = new DiagnosisResponseBuilder(diagnosis, 50, false);
        response = builder.build();
        assertEquals("antibiotic1-2", response.getTreatments().get(0).getAntibiotic());
        assertEquals("antibiotic2-2", response.getTreatments().get(1).getAntibiotic());
        assertEquals(1500000, response.getTreatments().get(0).getFormula().getStrength().getValue());
        assertEquals(500, response.getTreatments().get(1).getFormula().getStrength().getValue());

        // 60kg -> 1: strenght 2000000, 2: strength 750
        builder = new DiagnosisResponseBuilder(diagnosis, 60, false);
        response = builder.build();
        assertEquals("antibiotic1-2", response.getTreatments().get(0).getAntibiotic());
        assertEquals("antibiotic2-2", response.getTreatments().get(1).getAntibiotic());
        assertEquals(2000000, response.getTreatments().get(0).getFormula().getStrength().getValue());
        assertEquals(750, response.getTreatments().get(1).getFormula().getStrength().getValue());
    }

    @Test
    public void testNegativeWeight() {

        DiagnosisResponseBuilder builder = new DiagnosisResponseBuilder(diagnosis, -1, false);
        assertThrows(TreatmentNotFoundException.class, () -> builder.build());
    }

    @Test
    public void testZeroWeight() {

        DiagnosisResponseBuilder builder = new DiagnosisResponseBuilder(diagnosis, 0, false);
        assertDoesNotThrow(() -> builder.build());
    }

    @Test
    public void testNoSuitableAntibiotic() {
        // This test represents configuration error.
        // There should always be some strength within treatment that is applicable when weight > 0.

        treatments.clear();
        List<Antibiotic> antibiotics = new ArrayList<>(
            Arrays.asList(
                generateMixture(
                    "antibiotic-1", new ArrayList<Strength>(
                        Arrays.asList(
                            new Strength(100, 10, null, null),
                            new Strength(200, 20, null, null)
                        )
                    )
                ),
                generateTablet(
                    "antibiotic-2", new ArrayList<Strength>(
                        Arrays.asList(
                            new Strength(1000000, 40, null, null),
                            new Strength(1500000, 50, null, null),
                            new Strength(2000000, 60, null, null)
                        )
                    )
                )
            )
        );
        treatments.add(new Treatment(1, antibiotics));

        DiagnosisResponseBuilder builder = new DiagnosisResponseBuilder(diagnosis, 5, false);
        assertThrows(TreatmentNotFoundException.class, () -> builder.build());

    }

    private Antibiotic generateMixture(String id, List<Strength> strengths) {
        Instructions instructions = new Instructions(10, 2, null, null);
        Dosage dosage = new Dosage(3000, 40, null);
        return new Mixture(id, null, strengths, instructions, null, dosage);
    }

    private Antibiotic generateTablet(String id, List<Strength> strengths) {
        Instructions instructions = new Instructions(5, 1, null, null);
        return new Tablet(id, null, strengths, instructions, 1);
    }
}
