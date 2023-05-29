package fi.tuni.koodimankelit.antibiootit.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * API representation of diagnosis response with treatments
 */
@Schema(description = "API diagnosis response with treatments")
public class DiagnosisResponse {

    @JsonProperty("_id")
    private final String id;
    private final String etiology;
    private final String description;
    private final ArrayList<AntibioticTreatment> treatments;
    private final ArrayList<APITargetedInfo> targetedInfos;

    /**
     * Default constructor
     * @param id ICD-10 identifier
     * @param etiology common cause for diagnosis
     * @param description info text
     */
    public DiagnosisResponse(String id, String etiology, String description) {
        this.id = id;
        this.etiology = etiology;
        this.description = description;
        this.treatments = new ArrayList<>();
        this.targetedInfos = new ArrayList<>();
    }

    
    /** 
     * Adds a new treatment
     * @param treatment Antibiotic treatment
     */
    public void addTreatment(AntibioticTreatment treatment) {
        this.treatments.add(treatment);
    }

    /**
     * Adds a new targeted info
     * @param targetedInfo Targeted info 
     */
    public void addTargetedInfo(APITargetedInfo targetedInfo) {
        this.targetedInfos.add(targetedInfo);
    }

    
    /** 
     * Returns ICD-10 identifier
     * @return String id
     */
    public String getId() {
        return this.id;
    }


    
    /** 
     * Returns common cause
     * @return String etiology
     */
    public String getEtiology() {
        return this.etiology;
    }

    /**
     * Returns additional info about diagnose
     * @return String description
     */
    public String getDescription() {
        return this.description;
    }

    
    /** 
     * Returns all treatments
     * @return List<AntibioticTreatment> treatments
     */
    public List<AntibioticTreatment> getTreatments() {
        return this.treatments;
    }

    public List<APITargetedInfo> getTargetedInfos() {
        return this.targetedInfos;
    }

}
