package fi.tuni.koodimankelit.antibiootit.builder;

import fi.tuni.koodimankelit.antibiootit.database.data.Antibiotic;
import fi.tuni.koodimankelit.antibiootit.database.data.Instructions;
import fi.tuni.koodimankelit.antibiootit.database.data.MinMaxMixture;
import fi.tuni.koodimankelit.antibiootit.database.data.Strength;
import fi.tuni.koodimankelit.antibiootit.exceptions.TreatmentNotFoundException;
import fi.tuni.koodimankelit.antibiootit.models.AntibioticTreatment;
import fi.tuni.koodimankelit.antibiootit.models.DosageResult;
import fi.tuni.koodimankelit.antibiootit.models.Formula;


/**
 * Builder for antibiotic treatment. Calculates dosage based on weight
 */
public abstract class AntibioticTreatmentBuilder {

    private final Antibiotic antibiotic;
    protected final double weight;
    protected final Strength strength;

    /**
     * Default constructor
     * @param antibiotic Database entity instance
     * @param weight Weight in kilograms
     */
    public AntibioticTreatmentBuilder(Antibiotic antibiotic, double weight) {

        this.antibiotic = antibiotic;
        this.weight = weight;
        this.strength = getStrength(antibiotic, weight);
    }

    
    /** 
     * Build antibiotic treatment object
     * @return AntibioticTreatment generated result
     */
    public AntibioticTreatment build() {

        // Does not exceed minimum weight on any strength
        if(this.strength == null) {
            throw new TreatmentNotFoundException("Selected antibiotic has no suitable strength");
        }

        Instructions instructions = 
            new Instructions(antibiotic.getInstructions().getDays(), antibiotic.getInstructions().getDosesPerDay(), 
                antibiotic.getInstructions().getRecipeText(), antibiotic.getInstructions().getDoseMultipliers());

        MinMaxMixture minMaxMixture = 
            new MinMaxMixture(antibiotic.getMinMaxMixture().getMinMixtureWeight(), antibiotic.getMinMaxMixture().getMaxMixtureWeight());

        boolean canMixture = isMixture(weight, minMaxMixture.getMinMixtureWeight(), minMaxMixture.getMaxMixtureWeight());

        return new AntibioticTreatment(
            antibiotic.getFormat(),
            antibiotic.getAntibiotic(),
            instructions,
            canMixture,
            buildFormula(),
            buildResult(),
            requiresSicMark()
        );
    }

    protected abstract Formula buildFormula();

    protected abstract DosageResult buildResult();
    
    /** 
     * Return antibiotic's strength
     * @param antibiotic Antibiotic instance
     * @param weight weight in kilograms
     * @return Strength antibiotic's strength
     */
    private static Strength getStrength(Antibiotic antibiotic, double weight) {

        // Sort by minimum weight, highest first
        antibiotic.getStrength().sort((a, b) -> Integer.valueOf(b.getMinWeight()).compareTo(Integer.valueOf(a.getMinWeight())));
        for(Strength strength : antibiotic.getStrength()) {
            if(weight >= strength.getMinWeight()) {
                return strength;
            }
        }
        return null;
    }

    /**
     * Return if mixture can also be given
     * @param weight weight in kilograms
     * @param minMixtureWeight weight in kg
     * @param maxMixtureWeight weight in kg
     * @return boolean true if mixture can be given else false
     */
    private static boolean isMixture(double weight, int minMixtureWeight, int maxMixtureWeight) {
        if(weight >= minMixtureWeight && weight <= maxMixtureWeight) {
            return true;
        } else {
            return false;
        }
    }

    private boolean requiresSicMark() {
        return false;
    }

}
