package fi.tuni.koodimankelit.antibiootit.models.request;

import java.util.List;

import javax.persistence.ElementCollection;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Request parameters")
public class Parameters {


    @NotBlank(message = "DiagnosisID is mandatory")
    private final String diagnosisID;

    @NotNull(message = "Weight is mandatory")
    private final Double weight;

    @NotNull(message = "PenicillinAllergic is mandatory")
    private final Boolean penicillinAllergic;

    @NotNull(message = "CheckBoxes is mandatory")
    @Valid
    @ElementCollection
    private final List<InfectionSelection> checkBoxes;

    @NotNull(message = "Mixture is mandatory")
    private final Boolean mixture;


    public Parameters(String diagnosisID, Double weight, Boolean penicillinAllergic, List<InfectionSelection> checkBoxes, Boolean mixture) {
        this.diagnosisID = diagnosisID;
        this.weight = weight;
        this.penicillinAllergic = penicillinAllergic;
        this.checkBoxes = checkBoxes;
        this.mixture = mixture;
    }


    public String getDiagnosisID() {
        return this.diagnosisID;
    }


    public double getWeight() {
        return this.weight;
    }


    public boolean getPenicillinAllergic() {
        return this.penicillinAllergic;
    }
    
    
    public List<InfectionSelection> getCheckBoxes() {
        return this.checkBoxes;
    }

    public boolean getMixture() {
        return this.mixture;
    }
}
