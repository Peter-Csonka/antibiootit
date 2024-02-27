package fi.tuni.koodimankelit.antibiootit.sic;

import java.util.List;

import fi.tuni.koodimankelit.antibiootit.database.data.Strength;

/**
 * Service that contains rules to add SIC!-mark to antibiotic treatment
 */
public class SicAlertService {

    private List<SicAlert> sicAlerts;

    public SicAlertService() {
        this.sicAlerts = List.of(
            new SicAlert(null, null, "Kefaleksiini", 3, new Strength(750, 0, "mg", null), 1),
            new SicAlert(23.0, 29.0, "V-Penisilliini", 3, new Strength(1000000, 0, "IU", null), 1)
        );
    }

    public boolean requiresSicAlert(double weight, String antibioticName, int dosesPerDay, Strength strength, int tabletsPerDose) {
        return sicAlerts.stream().anyMatch(alert -> alert.hasSicAlert(weight, antibioticName, dosesPerDay, strength, tabletsPerDose));
    }

}
