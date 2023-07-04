package fi.tuni.koodimankelit.antibiootit.database.data;

import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;

import io.swagger.v3.oas.annotations.media.Schema;
import nonapi.io.github.classgraph.json.Id;

/**
 * Representation of diagnosis basic info
 */
@Schema(description = "Basic information of a diagnosis")
@Document(collection = "diagnoses")
public class DiagnosisInfo {

    @Id
    private final String id;
    private final String name;
    private final String etiology;
    private final List<CheckBoxInfo> checkBoxes;
    private final boolean needsAntibiotics;

    /**
     * Default constructor
     * @param id ICD-10 identifier
     * @param name name of diagnosis
     * @param etiology etiology (common cause) of diagnosis
     * @param checkBoxes list of possibly needed checkboxes for diagnosis
     * @param needsAntibiotics tells if diagnosis needs antibiotics
     */
    public DiagnosisInfo(String id, String name, String etiology, List<CheckBoxInfo> checkBoxes, boolean needsAntibiotics) {
        super();
        this.id = id;
        this.name = name;
        this.etiology = etiology;
        this.checkBoxes = checkBoxes;
        this.needsAntibiotics = needsAntibiotics;
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
     * Returns list of checkboxes
     * @return List<CheckBoxInfo> checkBoxes
     */
    public List<CheckBoxInfo> getCheckBoxes() {
        return this.checkBoxes;
    }

    /**
     * Returns if diagnosis need antibiotics
     * @return boolean needsAntibiotics
     */
    public boolean getNeedsAntibiotics() {
        return this.needsAntibiotics;
    }
}
