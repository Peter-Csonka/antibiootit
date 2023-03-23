package fi.tuni.koodimankelit.antibiootit.database;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import fi.tuni.koodimankelit.antibiootit.database.data.Antibiotic;
import fi.tuni.koodimankelit.antibiootit.database.data.Diagnosis;
import fi.tuni.koodimankelit.antibiootit.database.data.DiagnosisInfo;
import fi.tuni.koodimankelit.antibiootit.database.data.DoseMultiplier;
import fi.tuni.koodimankelit.antibiootit.database.data.Mixture;
import fi.tuni.koodimankelit.antibiootit.database.data.Strength;
import fi.tuni.koodimankelit.antibiootit.database.data.Tablet;
import fi.tuni.koodimankelit.antibiootit.database.data.Treatment;

/**
 * Tests for DiagnosisRepository class. 
 * Tests mainly focus on that the data structure stays correct after the data is fetched from database.
 */
@ExtendWith(SpringExtension.class)
@DataMongoTest
public class DiagnosisRepositoryTest {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private DiagnosisRepository diagnosisRepository;

    @BeforeEach
    public void setUp() {
        mongoTemplate.dropCollection(Diagnosis.class);
        mongoTemplate.insertAll(null);
    }

    @Test
    public void testFindDiagnosisByIdNoAntibiotics() {
        Optional<Diagnosis> result = diagnosisRepository.findById("J20.9");

        // Test if diagnosis is found
        assertEquals(true, result.isPresent());
        Diagnosis foundDiagnosis = result.get();

        // Test diagnosis info
        assertEquals("J20.9", foundDiagnosis.getId());
        assertEquals(0, foundDiagnosis.getCheckBoxes().size());
        assertNotNull(foundDiagnosis.getName());
        assertNotNull(foundDiagnosis.getInfectionType());
        assertFalse(foundDiagnosis.getNeedsAntibiotics());

        // Test treatment info
        List<Treatment> treatments = foundDiagnosis.getTreatments();
        assertEquals(1, treatments.size());
        assertEquals(0, treatments.get(0).getChoice());

        // Test antibiotic info
        List<Antibiotic> antibiotics = treatments.get(0).getAntibiotics();
        assertEquals(1, antibiotics.size());
        Antibiotic antibiotic = antibiotics.get(0);
        assertEquals("", antibiotic.getAntibiotic());
        assertEquals(0, antibiotic.getDays());
        assertEquals(0, antibiotic.getStrength().size());
        assertEquals(0, antibiotic.getDoseMultipliers().size());
    }

    @Test
    public void testFindDiagnosisByIdHasAntibiotics() {
        Optional<Diagnosis> result = diagnosisRepository.findById("J03.0");

        // Test if diagnosis is found
        assertEquals(true, result.isPresent());
        Diagnosis foundDiagnosis = result.get();

        // Test diagnosis info
        assertEquals("J03.0", foundDiagnosis.getId());
        assertEquals(1, foundDiagnosis.getCheckBoxes().size());
        assertNotNull(foundDiagnosis.getName());
        assertNotNull(foundDiagnosis.getEtiology());
        assertNotNull(foundDiagnosis.getInfectionType());
        assertNotNull(foundDiagnosis.getCheckBoxes().get(0).getId());
        assertNotNull(foundDiagnosis.getCheckBoxes().get(0).getName());
        assertTrue(foundDiagnosis.getNeedsAntibiotics());

        // Test treatment info
        List<Treatment> treatments = foundDiagnosis.getTreatments();
        assertEquals(3, treatments.size());
        
        // Test primary treatment
        Treatment primary = treatments.get(0);
        assertEquals(1, primary.getChoice());
        List<Antibiotic> antibiotics = primary.getAntibiotics();
        assertEquals(2, antibiotics.size());

        // Test that primary treatment has both mixture and tablet instances
        Mixture mixture = null;
        if (antibiotics.get(0) instanceof Mixture) {
            mixture = (Mixture) antibiotics.get(0);
        } else if (antibiotics.get(1) instanceof Mixture) {
            mixture = (Mixture) antibiotics.get(1);
        }
        assertNotNull(mixture);

        Tablet tablet = null;
        if (antibiotics.get(0) instanceof Tablet) {
            tablet = (Tablet) antibiotics.get(0);
        } else if (antibiotics.get(1) instanceof Tablet) {
            tablet = (Tablet) antibiotics.get(1);
        }
        assertNotNull(tablet);

        // Test mixture and tablet
        testMixture(mixture);
        testTablet(tablet);

        // Test secondary treatment
        Treatment secondary = treatments.get(1);
        assertEquals(2, secondary.getChoice());
        antibiotics = secondary.getAntibiotics();
        assertEquals(2, antibiotics.size());

        // Test that secondary treatment has both mixture and tablet instances
        mixture = null;
        if (antibiotics.get(0) instanceof Mixture) {
                mixture = (Mixture) antibiotics.get(0);
        } else if (antibiotics.get(1) instanceof Mixture) {
            mixture = (Mixture) antibiotics.get(1);
        }
        assertNotNull(mixture);
        
        tablet = null;
        if (antibiotics.get(0) instanceof Tablet) {
            tablet = (Tablet) antibiotics.get(0);
        } else if (antibiotics.get(1) instanceof Tablet) {
            tablet = (Tablet) antibiotics.get(1);
        }
        assertNotNull(tablet);
        
        // Test mixture and tablet
        testMixture(mixture);
        testTablet(tablet);

        // Test treatment for penicillin allergy
        Treatment allergy = treatments.get(2);
        assertEquals(3, allergy.getChoice());
        antibiotics = allergy.getAntibiotics();
        assertEquals(2, antibiotics.size());

        // Test that penicillin allergy treatment has both mixture and tablet instances
        mixture = null;
        if (antibiotics.get(0) instanceof Mixture) {
            mixture = (Mixture) antibiotics.get(0);
        } else if (antibiotics.get(1) instanceof Mixture) {
            mixture = (Mixture) antibiotics.get(1);
        }
        assertNotNull(mixture);

        tablet = null;
        if (antibiotics.get(0) instanceof Tablet) {
            tablet = (Tablet) antibiotics.get(0);
        } else if (antibiotics.get(1) instanceof Tablet) {
            tablet = (Tablet) antibiotics.get(1);
        }
        assertNotNull(tablet);

        // Test mixture and tablet
        testMixture(mixture);
        testTablet(tablet);

    }

    @Test
    public void testGetAllDiagnosisInfos() {
        List<DiagnosisInfo> result = diagnosisRepository.getAllDiagnosisInfos();

        // Test that there is right amount of diagnosis and that the order is correct
        assertEquals(6, result.size());
        assertEquals("J03.0", result.get(0).getId());
        assertEquals("H66.0", result.get(1).getId());
        assertEquals("J01.9", result.get(2).getId());
        assertEquals("J20.9", result.get(3).getId());
        assertEquals("J21.9", result.get(4).getId());
        assertEquals("J18.9", result.get(5).getId());
    }

    @Test
    public void testFindDiagnosisInfoById() {
        Optional<DiagnosisInfo> result = diagnosisRepository.getDiagnosisInfoById("J20.9");

        // Test if the diagnosis is found and that the id is correct
        assertEquals(true, result.isPresent());
        DiagnosisInfo foundDiagnosisInfo = result.get();
        assertEquals("J20.9", foundDiagnosisInfo.getId());
    }

    private void testTablet(Tablet tablet) {
        assertNotNull(tablet.getAntibiotic());
        assertNotNull(tablet.getFormat());
        assertNotNull(tablet.getInfo());
        assertNotNull(tablet.getDosagePerDay());
        assertNotNull(tablet.getDosagePerDayUnit());
        assertNotNull(tablet.getMaxDosePerDay());
        assertNotNull(tablet.getWeightUnit());
        assertNotNull(tablet.getDays());
        assertNotNull(tablet.getDosesPerDay());
        assertNotNull(tablet.getTabletsPerDose());

        assertTrue(tablet.getStrength().size() > 0);
        Strength strength = tablet.getStrength().get(0);
        assertNotNull(strength.getMinWeight());
        assertNotNull(strength.getUnit());
        assertNotNull(strength.getValue());
        // TODO lisää text testi

        assertTrue(tablet.getDoseMultipliers().size() > 0);
        DoseMultiplier doseMultiplier = tablet.getDoseMultipliers().get(0);
        assertNotNull(doseMultiplier.getId());
        assertNotNull(doseMultiplier.getMultiplier());
    }

    private void testMixture(Mixture mixture) {
        assertNotNull(mixture.getAntibiotic());
        assertNotNull(mixture.getFormat());
        assertNotNull(mixture.getInfo());
        assertNotNull(mixture.getDosagePerWeightPerDayUnit());
        assertNotNull(mixture.getDosagePerWeightPerDay());
        assertNotNull(mixture.getMaxDosePerDay());
        assertNotNull(mixture.getWeightUnit());
        assertNotNull(mixture.getResultUnit());
        assertNotNull(mixture.getDays());
        assertNotNull(mixture.getDosesPerDay());

        assertTrue(mixture.getStrength().size() > 0);
        Strength strength = mixture.getStrength().get(0);
        assertNotNull(strength.getUnit());
        assertNotNull(strength.getMinWeight());
        assertNotNull(strength.getValue());
        // TODO lisää text testi

        assertTrue(mixture.getDoseMultipliers().size() > 0);
        DoseMultiplier doseMultiplier = mixture.getDoseMultipliers().get(0);
        assertNotNull(doseMultiplier.getId());
        assertNotNull(doseMultiplier.getMultiplier());
    }
}
