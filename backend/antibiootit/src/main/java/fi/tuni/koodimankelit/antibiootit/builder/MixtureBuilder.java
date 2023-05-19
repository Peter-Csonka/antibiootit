package fi.tuni.koodimankelit.antibiootit.builder;

import java.math.BigDecimal;
import java.math.RoundingMode;

import fi.tuni.koodimankelit.antibiootit.database.data.Dosage;
import fi.tuni.koodimankelit.antibiootit.database.data.Mixture;
import fi.tuni.koodimankelit.antibiootit.models.AccurateDosageResult;
import fi.tuni.koodimankelit.antibiootit.models.DosageFormula;
import fi.tuni.koodimankelit.antibiootit.models.DosageResult;
import fi.tuni.koodimankelit.antibiootit.models.Measurement;
import fi.tuni.koodimankelit.antibiootit.models.StrengthMeasurement;

public class MixtureBuilder extends AntibioticTreatmentBuilder {

    private final Mixture antibiotic;

    public MixtureBuilder(Mixture antibiotic, double weight) {
        super(antibiotic, weight);
        
        this.antibiotic = antibiotic;
    }

    @Override
    protected DosageFormula buildFormula() {
        return new DosageFormula(
            new StrengthMeasurement(strength.getUnit(), strength.getValue(), strength.getText()),
            new Measurement(antibiotic.getDosage().getDosagePerWeightPerDayUnit(), antibiotic.getDosage().getDosagePerWeightPerDay())
        );
    }

    @Override
    protected DosageResult buildResult() {
        Double dosageResult = calculateDosageResult();
        Double roundedResult = roundToNearestHalf(dosageResult);
        Double accResult = accurateDosageResult();
        String resultUnit = antibiotic.getResultUnit();

        return new AccurateDosageResult(
            new Measurement(resultUnit, roundedResult),
            new Measurement(resultUnit, dosageResult),
            new Measurement(resultUnit, accResult)
        );
    }

    /** 
     * Calculates one-time antibiotic dosage based on weight. Rounds the result to three decimals
     * @return Double one-time dosage. Unit depends on antibiotic
     */
    private Double calculateDosageResult() {
        Dosage dosage = antibiotic.getDosage();
        Double dosagePerDay = dosage.getDosagePerWeightPerDay() * weight;
        if(dosagePerDay > dosage.getMaxDosePerDay()) {
            dosagePerDay = (double) dosage.getMaxDosePerDay();
        }
        Double totalDosageInDay = dosagePerDay / strength.getValue();
        Double accurateResult = totalDosageInDay / antibiotic.getInstructions().getDosesPerDay();

        BigDecimal bd = BigDecimal.valueOf(accurateResult);
        bd = bd.setScale(3, RoundingMode.HALF_UP);
        double roundedResult = bd.doubleValue();

        return roundedResult;
    }

    /**
     * Calculates accurate antibiotic dosage based on weight. Doesn't take max dosage
     * into account
     * @return Double one-time dosage. Unit depends on antibiotic
     */
    private Double accurateDosageResult() {
        Dosage dosage = antibiotic.getDosage();
        Double dosagePerDay = dosage.getDosagePerWeightPerDay() * weight;
        Double totalDosageInDay = dosagePerDay / strength.getValue();
        Double accurateResult = totalDosageInDay / antibiotic.getInstructions().getDosesPerDay();

        BigDecimal bd = BigDecimal.valueOf(accurateResult);
        bd = bd.setScale(3, RoundingMode.HALF_UP);
        double roundedResult = bd.doubleValue();

        return roundedResult;
    }

    /**
     * Rounds a value to nearest half
     * @param value Double to round
     * @return Double Rounded value
     */
    private Double roundToNearestHalf(Double value) {
        Double roundedValue = ((int)(value * 2 + 0.5)) / 2.0;
        return roundedValue;
    }
}
