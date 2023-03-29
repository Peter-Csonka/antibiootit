package fi.tuni.koodimankelit.antibiootit.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import fi.tuni.koodimankelit.antibiootit.database.DiagnosisRepository;
import fi.tuni.koodimankelit.antibiootit.database.data.Diagnosis;
import fi.tuni.koodimankelit.antibiootit.database.data.DiagnosisInfo;
import fi.tuni.koodimankelit.antibiootit.exceptions.DiagnosisNotFoundException;
import fi.tuni.koodimankelit.antibiootit.services.DataHandler;


/**
 * Tests for DataHandler service
 */
@SpringBootTest
public class DataHandlerTest {
    
    @Autowired
    private DataHandler dataHandler;

    @MockBean
    private DiagnosisRepository repository;

    /**
     * Test getDiagnosisById when searched object is found
     */
    @Test
    public void testGetDiagnosisByIdSuccess() {

        Diagnosis diagnosis = new Diagnosis("test", null, null, null, null, null, false);
        when(repository.findById("test")).thenReturn(Optional.of(diagnosis));

        Diagnosis result = dataHandler.getDiagnosisById("test");
        assertEquals("test", result.getId());
    }

    /**
     * Test getDiagnosisById when searched object is not found
     */
    @Test
    public void testGetDiagnosisByIdException() {
        when(repository.findById(any())).thenReturn(Optional.empty());
        assertThrows(DiagnosisNotFoundException.class, () -> dataHandler.getDiagnosisById("test"));
    }

    /**
     * Test getDiagnosisInfoById when searched object is found
     */
    @Test
    public void testGetDiagnosisInfoByIdSuccess() {

        DiagnosisInfo diagnosisInfo = new DiagnosisInfo("test", null, null, null, false);
        when(repository.getDiagnosisInfoById("test")).thenReturn(Optional.of(diagnosisInfo));

        DiagnosisInfo result = dataHandler.getDiagnosisInfoById("test");
        assertEquals("test", result.getId());

    }

    /**
     * Test getDiagnosisInfoById when searched object is not found
     */
    @Test
    public void testGetDiagnosisInfoByIdException() {
        when(repository.getDiagnosisInfoById(any())).thenReturn(Optional.empty());
        assertThrows(DiagnosisNotFoundException.class, () -> dataHandler.getDiagnosisInfoById("test"));
    }

    /**
     * Test getAllDiagnosisInfos contains all elements and retains order
     */
    @Test
    public void testGetAllDiagnosisInfos() {

        List<DiagnosisInfo> diagnosisInfos = new ArrayList<>();
        diagnosisInfos.add(new DiagnosisInfo("test1", null, null, null, false));
        diagnosisInfos.add(new DiagnosisInfo("test2", null, null, null, false));
        diagnosisInfos.add(new DiagnosisInfo("test3", null, null, null, false));

        when(repository.getAllDiagnosisInfos()).thenReturn(diagnosisInfos);
        List<DiagnosisInfo> result = dataHandler.getAllDiagnosisInfos();

        assertEquals(3, result.size());

        // Assert that service retains the order of original list. ArrayList retains insertion order
        assertEquals(result.get(1).getId(), "test2");
    }

    /**
     * Test getAllDiagnosisInfos handles empty results correctly
     */
    @Test
    public void testGetAllDiagnosisInfosEmpty() {
        when(repository.getAllDiagnosisInfos()).thenReturn(new ArrayList<>());
        List<DiagnosisInfo> result = dataHandler.getAllDiagnosisInfos();
        assertTrue(result.isEmpty());
    }

    /**
     * Test getAllDiagnosisInfos handles null value
     */
    @Test
    public void testGetAllDiagnosisInfosNull() {
        when(repository.getAllDiagnosisInfos()).thenReturn(null);
        List<DiagnosisInfo> result = dataHandler.getAllDiagnosisInfos();
        assertNull(result);
    }
}
