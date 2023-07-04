package fi.tuni.koodimankelit.antibiootit.database.data;

import java.util.List;

/**
 * Database representation of antibiotic in a form of mixture
 */
public class Mixture extends Antibiotic {
    private final String resultUnit;
    private final Dosage dosage;

    /**
     * Default constructor
     * @param antibiotic antibiotic's name
     * @param format antibiotic's format
     * @param strength list of different strengths of the antibiotic
     * @param instructions instructions on how to use antibiotic
     * @param resultUnit mixture's result unit
     * @param dosage mixture's dosage information
     */
    public Mixture(String antibiotic, String format, List<Strength> strength, Instructions instructions, 
                String resultUnit, Dosage dosage, MinMaxMixture minMaxMixture) {
        super(antibiotic, format, strength, instructions, minMaxMixture);
        this.resultUnit = resultUnit;
        this.dosage = dosage;
    }

    /**
     * Returns mixture's result unit
     * @return String resultUnit
     */
    public String getResultUnit() {
        return this.resultUnit;
    }

    /**
     * Returns mixture's dosage information 
     * @return Dosage dosage information
     */
    public Dosage getDosage() {
        return this.dosage;
    }    
}
