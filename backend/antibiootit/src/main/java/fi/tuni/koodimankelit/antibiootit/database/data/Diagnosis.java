package fi.tuni.koodimankelit.antibiootit.database.data;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Database representation of diagnosis
 */
@Document(collection = "diagnoses")
public class Diagnosis {

    @Id
    private final String id;

    private final String name;
    private final String etiology;
    private final String info;
    private final String infectionType;
    private final List<Treatment> treatments;
    private final List<CheckBoxInfo> checkBoxes;
    private final boolean needsAntibiotics;
    private final List<TargetedInfo> targetedInfo;

    /**
     * Default constructor
     * @param id ICD-10 identifier
     * @param name diagnosis name
     * @param etiology diagnosis etiology (common cause)
     * @param info additional information about treatment
     * @param infectionType infection type of the diagnosis
     * @param checkBoxes list of possibly needed checkboxes for diagnosis
     * @param treatments List of all treatment options 
     * @param needsAntibiotics tells if diagnosis needs antibiotics
     * @param targetedInfo tells if diagnosis has targeted info for a certain checkbox selection
     */
    public Diagnosis(String id, String name, String etiology, String info, String infectionType, 
                List<CheckBoxInfo> checkBoxes, List<Treatment> treatments, boolean needsAntibiotics,
                List<TargetedInfo> targetedInfo) {
        super();
        this.id = id;
        this.name = name;
        this.etiology = etiology;
        this.info = info;
        this.infectionType = infectionType;
        this.treatments = treatments;
        this.checkBoxes = checkBoxes;
        this.needsAntibiotics = needsAntibiotics;
        this.targetedInfo = targetedInfo;
    }

    /**
     * Returns diagnosis ICD-10 identifier
     * @return String id
     */
    public String getId() {
        return this.id;
    }

    /**
     * Returns diagnosis name
     * @return String name
     */
    public String getName() {
        return this.name;
    }

    /**
     * Returns diagnosis etiology
     * @return String etiology
     */
    public String getEtiology() {
        return this.etiology;
    }

    /**
     * Returns additional info about treatment
     * @return String additional info
     */
    public String getInfo() {
        return this.info;
    }

    /**
     * Returns diagnosis infection type
     * @return String infectionType
     */
    public String getInfectionType() {
        return this.infectionType;
    }

    /**
     * Returns list of diagnosis treatment options 
     * @return List<Treatment> treatments
     */
    public List<Treatment> getTreatments() {
        return this.treatments;
    }

    /**
     * Returns list of checkboxes
     * @return List<CheckBoxInfo> checkBoxes
     */
    public List<CheckBoxInfo> getCheckBoxes() {
        return this.checkBoxes;
    }

    /**
     * Returns if diagnosis needs antibiotics
     * @return boolean needsAntibiotics
     */
    public boolean getNeedsAntibiotics() {
        return this.needsAntibiotics;
    }

    /**
     * Returns list targeted info
     * @return List<TargetedInfo> targetedInfo
     */
    public List<TargetedInfo> getTargetedInfo() {
        return this.targetedInfo;
    }
}