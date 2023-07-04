package fi.tuni.koodimankelit.antibiootit.database.data;
import io.swagger.v3.oas.annotations.media.Schema;

//import org.springframework.data.mongodb.core.mapping.Field;

/**
 * Database representation of antibiotics min and max weigth when also a mixture can be given
 */
@Schema(description = "Weights for mixture use")
public class MinMaxMixture {
    private final int minMixtureWeight;
    private final int maxMixtureWeight;

    /**
     * Default constructor
     * @param minMixtureWeight minimum weight for when a mixture can be given instead of tablet
     * @param maxMixtureWeight maximum weight for when a mixture can be given instead of tablet
     */
    public MinMaxMixture(int minMixtureWeight, int maxMixtureWeight) {
        this.minMixtureWeight = minMixtureWeight;
        this.maxMixtureWeight = maxMixtureWeight;
    }

    /**
     * Returns value of minMixtureWeight
     * @return int value
     */
    public int getMinMixtureWeight() {
        return this.minMixtureWeight;
    }

    /**
     * Returns value of maxMixtureWeight
     * @return int value
     */
    public int getMaxMixtureWeight() {
        return this.maxMixtureWeight;
    }
}
