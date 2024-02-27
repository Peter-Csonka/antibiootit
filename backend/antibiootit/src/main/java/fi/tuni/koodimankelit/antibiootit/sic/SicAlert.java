package fi.tuni.koodimankelit.antibiootit.sic;

import fi.tuni.koodimankelit.antibiootit.database.data.Strength;

public class SicAlert {

    private final Integer minWeight;
    private final Integer maxWeight;
    private final String antibioticName;
    private final int dosesPerDay;
    private final Strength strength;
    private final int tabletsPerDose;

    public SicAlert(Integer minWeight, Integer maxWeight, String antibioticName, int dosesPerDay, Strength strength, int tabletsPerDose) {
        this.minWeight = minWeight;
        this.maxWeight = maxWeight;
        this.antibioticName = antibioticName;
        this.dosesPerDay = dosesPerDay;
        this.strength = strength;
        this.tabletsPerDose = tabletsPerDose;
    }

    public boolean hasSicAlert(int weight, String antibioticName, int dosesPerDay, Strength strength, int tabletsPerDose) {
        if (this.antibioticName != antibioticName) {
            return false;
        }
        if (!isWithinWeightLimits(weight)) {
            return false;
        }
        if (this.dosesPerDay != dosesPerDay) {
            return false;
        }
        if (this.tabletsPerDose != tabletsPerDose) {
            return false;
        }
        if (this.strength.getValue() != strength.getValue()) {
            return false;
        }
        return true;
    }

    private boolean isWithinWeightLimits(int weight) {
        if (this.minWeight != null) {
            if (weight < this.minWeight) {
                return false;
            }
        }
        if (this.maxWeight != null) {
            if (weight  > this.maxWeight) {
                return false;
            }
        }
        return true;
    }
}
