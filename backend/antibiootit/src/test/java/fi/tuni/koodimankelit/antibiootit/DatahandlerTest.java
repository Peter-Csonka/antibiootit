package fi.tuni.koodimankelit.antibiootit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import fi.tuni.koodimankelit.antibiootit.database.data.Diagnosis;
import fi.tuni.koodimankelit.antibiootit.database.data.DiagnosisInfo;
import fi.tuni.koodimankelit.antibiootit.database.data.InfoText;
import fi.tuni.koodimankelit.antibiootit.exceptions.DiagnosisNotFoundException;
import fi.tuni.koodimankelit.antibiootit.services.DataHandler;

/**
 * Tests for dataHandler class
 */
@SpringBootTest
public class DatahandlerTest {
    @Autowired
    private DataHandler dataHandler;

    @Test
    public void testGetDiagnosisById() {
        Diagnosis diagnosis = dataHandler.getDiagnosisById("J20.9");
        assertEquals("J20.9", diagnosis.getId());
    }

    @Test
    public void testDiagnosisNotFoundById() {
        assertThrows(DiagnosisNotFoundException.class, () -> dataHandler.getDiagnosisById(""));
    }

    @Test
    public void testGetAllDiagnosisInfos() {
        List<DiagnosisInfo> diagnosisInfos = dataHandler.getAllDiagnosisInfos();
        assertTrue(diagnosisInfos.size() > 0);
    }

    @Test
    public void testGetDiagnosisInfoById() {
        DiagnosisInfo diagnosisInfo = dataHandler.getDiagnosisInfoById("J20.9");
        assertEquals("J20.9", diagnosisInfo.getId());
    }

    @Test
    public void testDiagnosisInfoNotFoundById() {
        assertThrows(DiagnosisNotFoundException.class, () -> dataHandler.getDiagnosisInfoById(""));
    }

    @Test
    public void testGetAllInfoTexts() {
        List<InfoText> infotexts = dataHandler.getAllInfoTexts();
        assertTrue(infotexts.size() > 0);
    }
}
