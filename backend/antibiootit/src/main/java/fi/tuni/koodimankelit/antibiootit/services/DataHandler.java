package fi.tuni.koodimankelit.antibiootit.services;

import java.util.List;

import fi.tuni.koodimankelit.antibiootit.database.data.Diagnosis;
import fi.tuni.koodimankelit.antibiootit.database.data.DiagnosisInfo;
import fi.tuni.koodimankelit.antibiootit.database.data.InfoText;

/**
 * Database related services
 */
public interface DataHandler {

    /**
     * Finds and returns diagnosis with the given id but if id is not
     * found, throws DiagnosisNotFoundException
     * @param id Diagnosis id
     * @return Diagnosis 
     * @throws DiagnosisNotFoundException
     */
    public Diagnosis getDiagnosisById(String id);

    /**
     * Returns all diagnoses basic information: id, name, etiology, checkboxes
     * and if it needs antibiotics
     * @return List<DiagnosisInfo> List of diagnosis infos
     */
    public List<DiagnosisInfo> getAllDiagnosisInfos();

    /**
     * Finds and returns diagnosis info with the given id but if id is not
     * found, throws DiagnosisNotFoundException
     * @param id Diagnosis id
     * @return DiagnosisInfo Diagnosis info
     * @throws DiagnosisNotFoundException
     */
    public DiagnosisInfo getDiagnosisInfoById(String id);
    
    /**
     * Returns all info texts
     * @return List<InfoText> List of info texts
     */
    public List<InfoText> getAllInfoTexts();
}
