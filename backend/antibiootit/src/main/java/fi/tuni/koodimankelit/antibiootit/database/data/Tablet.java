package fi.tuni.koodimankelit.antibiootit.database.data;

import java.util.List;

/**
 * Database representation of antibiotic in a form of tablet
 */
public class Tablet extends Antibiotic {
    private final int tabletsPerDose;

    /**
     * Default constructor
     * @param antibiotic antibiotic's name
     * @param format antibiotic's format
     * @param strength list of different strengths of the antibiotic
     * @param instructions instructions on how to use antibiotic
     * @param tabletsPerDose how many tablets needs to be taken per dose
     */
    public Tablet(String antibiotic, String format, List<Strength> strength, Instructions instructions, int tabletsPerDose,
                        MinMaxMixture minMaxMixture) {
        super(antibiotic, format, strength, instructions, minMaxMixture);
        this.tabletsPerDose = tabletsPerDose;
    }

    /**
     * Returns how many tablets needs to be taken per dose
     * @return int tabletsPerDose
     */
    public int getTabletsPerDose() {
        return this.tabletsPerDose;
    }
}
