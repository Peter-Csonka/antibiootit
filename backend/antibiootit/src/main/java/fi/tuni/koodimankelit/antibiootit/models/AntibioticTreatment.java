package fi.tuni.koodimankelit.antibiootit.models;

import fi.tuni.koodimankelit.antibiootit.database.data.Instructions;
import fi.tuni.koodimankelit.antibiootit.database.data.MinMaxMixture;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * API response representation of antibiotic treatment
 */
@Schema(description = "API response of antibiotic treatment")
public class AntibioticTreatment {
    private final String format;
    private final String antibiotic;
    private final Instructions instructions;
    private final Formula formula;
    private final DosageResult dosageResult;
    private final MinMaxMixture minMaxMixtureWeights;


    /**
     * Default constructor
     * @param format antibiotic physical format
     * @param antibiotic name of the antibiotic
     * @param instructions instruction when to take the antibiotic
     * @param formula how the result was calculated
     * @param result calculated dosage result
     */
    public AntibioticTreatment(String format, String antibiotic, Instructions instructions, MinMaxMixture minMaxMixture, Formula formula, DosageResult result) {
        this.format = format;
        this.antibiotic = antibiotic;
        this.instructions = instructions;
        this.formula = formula;
        this.dosageResult = result;
        this.minMaxMixtureWeights = minMaxMixture;
    }
    
    /** 
     * Returns format
     * @return String format
     */
    public String getFormat() {
        return this.format;
    }

    
    /** 
     * Returns name
     * @return String name
     */
    public String getAntibiotic() {
        return this.antibiotic;
    }


    /** 
     * Return minmaxweigth
     * @return Min and max weights
     */
    public MinMaxMixture getMinMaxMixtureWeights() {
        return this.minMaxMixtureWeights;
    }
    
    /** 
     * Return instrctions
     * @return Instructions
     */
    public Instructions getInstructions() {
        return this.instructions;
    }


    
    /** 
     * Returns formula how the result were calculated
     * @return Formula
     */
    public Formula getFormula() {
        return this.formula;
    }


    
    /** 
     * Returns the dosage result
     * @return DosageResult
     */
    public DosageResult getDosageResult() {
        return this.dosageResult;
    }


}
