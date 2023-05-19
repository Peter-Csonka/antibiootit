package fi.tuni.koodimankelit.antibiootit.models;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Represents antibiotic dosage result with non-rounded result
 */
@Schema(description = "Antibiotic dosage result with non-rounded result")
public class AccurateDosageResult extends DosageResult {
    private final Measurement accurateDose;
    private final Measurement maxAccurateDose;

    /**
     * Default constructor
     * @param dose one-time dosage
     */
    public AccurateDosageResult(Measurement dose, Measurement accurateDose, Measurement maxAccurateDose) {
        super(dose);
        this.accurateDose = accurateDose;
        this.maxAccurateDose = maxAccurateDose;
    }

    /**
     * Returns the more accurate one-time dose (rounded to three decimals)
     * @return unrounded dose
     */
    public Measurement getAccurateDose() {
        return this.accurateDose;
    }

    /**
     * Returns the accurate one-time dose, even if above max dose
     * @return dose one-time dosage
     */
    public Measurement getMaxAccurateDose() {
        return this.maxAccurateDose;
    }
}
