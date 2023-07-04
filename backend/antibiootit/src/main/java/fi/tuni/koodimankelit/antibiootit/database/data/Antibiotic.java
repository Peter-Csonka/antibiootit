package fi.tuni.koodimankelit.antibiootit.database.data;

import java.util.List;

/**
 * Database representation of antibiotic
 */
public abstract class Antibiotic {
    private final String antibiotic;
    private final String format;
    private final List<Strength> strength;
    private final Instructions instructions;
    private final MinMaxMixture minMaxMixture;

    /**
     * Default constructor
     * @param antibiotic antibiotic's name
     * @param format antibiotic's format
     * @param strength list of different strengths of the antibiotic
     * @param instructions instructions on how to use antibiotic
     * @param minMaxMixture min and max weight for when an antibiote can also be given as a mixture
     */
    public Antibiotic(String antibiotic, String format, List<Strength> strength, Instructions instructions, MinMaxMixture minMaxMixture) {
        this.antibiotic = antibiotic;
        this.format = format;
        this.strength = strength;
        this.instructions = instructions;
        this.minMaxMixture = minMaxMixture;
    }

    /**
     * Returns antibiotic's name
     * @return String name
     */
    public String getAntibiotic() {
        return this.antibiotic;
    }

    /**
     * Returns antibiotic's format
     * @return String format
     */
    public String getFormat() {
        return this.format;
    }

    /**
     * Returns list of antibiotic's strengths
     * @return List<Strength> strength
     */
    public List<Strength> getStrength() {
        return this.strength;
    }

    /**
     * Returns instructions on how to use antibiotic
     * @return Instructions instructions for antibiotic
     */
    public Instructions getInstructions() {
        return this.instructions;
    }

    /**
     * Returns minimum and maximun weigths for mixture treatment
     * @return MinMaxMixture min and max weights for mixture treatment
     */
    public MinMaxMixture getMinMaxMixture() {
        return this.minMaxMixture;
    }
}
