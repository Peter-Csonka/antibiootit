package fi.tuni.koodimankelit.antibiootit.services;

import java.util.ArrayList;
import java.util.List;

import fi.tuni.koodimankelit.antibiootit.builder.DiagnosisResponseBuilder;
import fi.tuni.koodimankelit.antibiootit.database.data.Strength;
import fi.tuni.koodimankelit.antibiootit.sic.SicAlert;

/**
 * Service that is responsible of adding SIC!-mark to API response when predefined rules are met
 */
public class SicAlertService {

    private List<SicAlert> sicAlerts;

    public SicAlertService() {
        this.sicAlerts = List.of(
            new SicAlert(null, null, "Kefaleksiini", 3, new Strength(750, 0, "mg", null), 1),
            new SicAlert(23, 29, "V-Penisilliini", 3, new Strength(1000000, 0, "IU", null), 1)
        );
    }

}
