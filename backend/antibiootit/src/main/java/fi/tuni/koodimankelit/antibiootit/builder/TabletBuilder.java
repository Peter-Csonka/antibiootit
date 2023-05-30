package fi.tuni.koodimankelit.antibiootit.builder;


import fi.tuni.koodimankelit.antibiootit.database.data.Tablet;
import fi.tuni.koodimankelit.antibiootit.models.DosageResult;
import fi.tuni.koodimankelit.antibiootit.models.Formula;
import fi.tuni.koodimankelit.antibiootit.models.Measurement;
import fi.tuni.koodimankelit.antibiootit.models.StrengthMeasurement;

public class TabletBuilder extends AntibioticTreatmentBuilder {

    private final Tablet antibiotic;

    public TabletBuilder(Tablet antibiotic, double weight) {
        super(antibiotic, weight);

        this.antibiotic = antibiotic;
    }

    @Override
    protected Formula buildFormula() {
        return new Formula(
            new StrengthMeasurement(strength.getUnit(), strength.getValue(), strength.getText())
        );
    }

    @Override
    protected DosageResult buildResult() {
        String resultUnit = "tabletti";
        int dosageResult = antibiotic.getTabletsPerDose();
        
        return new DosageResult(
            new Measurement(resultUnit, dosageResult)
        );
    }
    

}
