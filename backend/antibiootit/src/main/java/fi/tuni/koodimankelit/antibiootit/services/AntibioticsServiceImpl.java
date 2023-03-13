package fi.tuni.koodimankelit.antibiootit.services;

import org.springframework.stereotype.Service;

import fi.tuni.koodimankelit.antibiootit.builder.DiagnosisResponseBuilder;
import fi.tuni.koodimankelit.antibiootit.database.data.Diagnosis;
import fi.tuni.koodimankelit.antibiootit.database.data.DiagnosisInfo;
import fi.tuni.koodimankelit.antibiootit.models.Diagnoses;
import fi.tuni.koodimankelit.antibiootit.models.DiagnosisResponse;
import fi.tuni.koodimankelit.antibiootit.models.request.Parameters;

@Service
public class AntibioticsServiceImpl implements AntibioticsService {

    private final DataHandler dataHandler;

    public AntibioticsServiceImpl(DataHandler dataHandler) {
        this.dataHandler = dataHandler;
    }

    public DiagnosisResponse calculateTreatments(Parameters parameters) {

        Diagnosis diagnosis = dataHandler.getDiagnosisById(parameters.getDiagnosisID());

        // If penicillinAllergic or any infection (checkBox is True)
        boolean usePenicillinAllergic = parameters.getPenicillinAllergic();
        usePenicillinAllergic = usePenicillinAllergic || parameters.getCheckBoxes().stream().anyMatch(c -> c.getValue());

        // Build response
        DiagnosisResponseBuilder builder = new DiagnosisResponseBuilder(diagnosis, parameters.getWeight(), usePenicillinAllergic);
        return builder.build();
        
    }

    public Diagnoses getAllDiagnoseInfos() {
        Diagnoses allDiagnoses = new Diagnoses(this.dataHandler.getAllDiagnosisInfos());
        return allDiagnoses;
    }

    @Override
    public DiagnosisInfo getDiagnoseInfoByID(String id) {
        return dataHandler.getDiagnosisInfoById(id);
    }

}
