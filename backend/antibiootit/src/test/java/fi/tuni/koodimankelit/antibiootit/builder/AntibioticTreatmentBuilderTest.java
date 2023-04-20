package fi.tuni.koodimankelit.antibiootit.builder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import fi.tuni.koodimankelit.antibiootit.database.data.DoseMultiplier;
import fi.tuni.koodimankelit.antibiootit.database.data.Instructions;
import fi.tuni.koodimankelit.antibiootit.database.data.Strength;
import fi.tuni.koodimankelit.antibiootit.exceptions.TreatmentNotFoundException;
import fi.tuni.koodimankelit.antibiootit.models.AntibioticTreatment;

public abstract class AntibioticTreatmentBuilderTest {
    

    protected final String antibiotic =  "antibiotic";
    protected final String format = "format";
    protected final String strengthUnit = "strengthUnit";
    protected final String strengthText = "strengthText";
    protected final String recipeText = "recipeText";

    protected final int days = 10;
    protected final int dosesPerDay = 3;

    protected final List<Strength> strengths = new ArrayList<>();
    protected final List<DoseMultiplier> doseMultipliers = new ArrayList<>();
    protected final Instructions instructions = new Instructions(days, dosesPerDay, recipeText, doseMultipliers);

    @BeforeEach
    public abstract void populateStrengths();

    @BeforeEach
    public void populateMultipliers() {
        doseMultipliers.clear();
        doseMultipliers.add(new DoseMultiplier(0, 1));
        doseMultipliers.add(new DoseMultiplier(1, 2));
    }

    /**
     * Test that correct strength is selected from populated list
     */
    @Test
    public abstract void testCorrectStrengthIsSelected();

    /**
     * Test that formula is correct
     */
    @Test
    public abstract void testCorrectFormula();

    /**
     * Test that negative weight results to exception
     */
    @Test
    public void testNegativeWeightThrowsException() {
        assertThrows(TreatmentNotFoundException.class, () -> getTreatment(-1));
    }

    /**
     * Test that empty strength list results to exception with valid weight
     */
    @Test
    public void testEmptyStrengthListThrowsException() {
        ArrayList<Strength> emptyStrengths = new ArrayList<>();
        AntibioticTreatmentBuilder builder = getBuilderWithStrengths(emptyStrengths, getValidWeight());
        assertThrows(TreatmentNotFoundException.class, () -> builder.build());
    }

    /**
     * Test that result has correct fields which do not require calculation
     */
    @Test
    public void testCorrectLabels() {
        AntibioticTreatment treatment = getTreatment(getValidWeight());

        assertEquals(antibiotic, treatment.getAntibiotic());
        assertEquals(format, treatment.getFormat());
    }

    /**
     * Test that instructions are correct
     */
    @Test
    public void testCorrectInstructions() {
        AntibioticTreatment treatment = getTreatment(getValidWeight());
        Instructions instructions = treatment.getInstructions();

        assertEquals(10, instructions.getDays());
        assertEquals(3, instructions.getDosesPerDay());
        assertEquals(recipeText, instructions.getRecipeText());

        List<DoseMultiplier> multipliers = instructions.getDoseMultipliers();
        assertEquals(2, multipliers.size());

        assertEquals(0, multipliers.get(0).getId());
        assertEquals(1, multipliers.get(0).getMultiplier());
        assertEquals(1, multipliers.get(1).getId());
        assertEquals(2, multipliers.get(1).getMultiplier());
    }


    /**
     * Return simple AntiobiticTreatment object with given weight
     * @param weight patient's weight
     * @return AntibioticTreatment
     */
    protected abstract AntibioticTreatment getTreatment(double weight);

    protected abstract AntibioticTreatmentBuilder getBuilderWithStrengths(List<Strength> strengths, double weight);

    protected abstract int getValidWeight();

    protected double getTreatmentStrength(double weight) {
        return getTreatment(weight).getFormula().getStrength().getValue();
    }
}
