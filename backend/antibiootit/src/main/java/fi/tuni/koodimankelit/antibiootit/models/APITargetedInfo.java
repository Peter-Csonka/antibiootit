package fi.tuni.koodimankelit.antibiootit.models;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * API representation of diagnosis response targeted info
 */
@Schema(description = "API diagnosis response with targeted info")
public class APITargetedInfo {
    private final String checkbox;
    private final String text;

    /**
     * Default constructor
     * @param checkbox which checkbox is selected
     * @param text text based on checkbox selected
     */
    public APITargetedInfo(String checkbox, String text) {
        this.checkbox = checkbox;
        this.text = text;
    }

    /** 
     * Returns checkbox
     * @return String checkbox
     */
    public String getCheckbox() {
        return this.checkbox;
    }

    
    /** 
     * Returns text
     * @return String text
     */
    public String getText() {
        return this.text;
    }

}
