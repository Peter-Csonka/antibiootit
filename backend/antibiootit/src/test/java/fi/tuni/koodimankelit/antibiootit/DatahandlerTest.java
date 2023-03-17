package fi.tuni.koodimankelit.antibiootit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import fi.tuni.koodimankelit.antibiootit.database.data.Diagnosis;
import fi.tuni.koodimankelit.antibiootit.exceptions.DiagnosisNotFoundException;
import fi.tuni.koodimankelit.antibiootit.services.DataHandler;

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
        assertThrows(DiagnosisNotFoundException.class, () -> {
            dataHandler.getDiagnosisById("");
        });
    }

    @Test
    public void testGetAllDiagnosisInfos() {

    }

    @Test
    public void testGetDiagnosisInfoById() {

    }

    @Test
    public void testDiagnosisInfoNotFoundById() {
        assertThrows(DiagnosisNotFoundException.class, () -> {
            dataHandler.getDiagnosisInfoById("");
        });
    }

    @Test
    public void testGetAllInfoTexts() {

    }
}
