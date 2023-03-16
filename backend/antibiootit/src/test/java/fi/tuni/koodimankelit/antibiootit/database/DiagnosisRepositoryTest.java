package fi.tuni.koodimankelit.antibiootit.database;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;

import fi.tuni.koodimankelit.antibiootit.database.data.Diagnosis;
import fi.tuni.koodimankelit.antibiootit.database.data.DiagnosisInfo;

@SpringBootTest
@AutoConfigureDataMongo
public class DiagnosisRepositoryTest {
    @Autowired
    private DiagnosisRepository diagnosisRepository;

    @Test
    public void testFindDiagnosisById() {
        Optional<Diagnosis> result = diagnosisRepository.findById("J20.9");

        assertEquals(true, result.isPresent());
        Diagnosis foundDiagnosis = result.get();
        assertEquals("J20.9", foundDiagnosis.getId());
    }

    @Test
    public void testGetAllDiagnosisInfos() {
        List<DiagnosisInfo> result = diagnosisRepository.getAllDiagnosisInfos();

        assertEquals(6, result.size());
        assertEquals("J20.9", result.get(3).getId());
    }

    @Test
    public void testFindDiagnosisInfoById() {
        Optional<DiagnosisInfo> result = diagnosisRepository.getDiagnosisInfoById("J20.9");

        assertEquals(true, result.isPresent());
        DiagnosisInfo foundDiagnosisInfo = result.get();
        assertEquals("J20.9", foundDiagnosisInfo.getId());
    }

}
