package fi.tuni.koodimankelit.antibiootit.validator;

import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.stereotype.Component;

import fi.tuni.koodimankelit.antibiootit.database.data.CheckBoxInfo;
import fi.tuni.koodimankelit.antibiootit.exceptions.InvalidParameterException;
import fi.tuni.koodimankelit.antibiootit.models.request.InfectionSelection;

/**
 * Validator for dose-calculation parameters
 */
@Component
public class CheckBoxValidator {

    /**
     * Validates that all required checkboxes are included in the request
     * @param checkBoxInfos Required checkboxes
     * @param infectionSelections Checkboxes in the request
     */
    public void validate(List<CheckBoxInfo> checkBoxInfos, List<InfectionSelection> infectionSelections) {
        Set<String> requestIDs = new TreeSet<>();
        Set<String> requiredIDs = new TreeSet<>();

        for (CheckBoxInfo checkBoxInfo : checkBoxInfos) {
            requiredIDs.add(checkBoxInfo.getId());
        }

        for(InfectionSelection infectionSelection : infectionSelections) {
            requestIDs.add(infectionSelection.getId());
        }

        if(!requestIDs.equals(requiredIDs)) {
            throw new InvalidParameterException(String.format("Only these checkboxes should be present: %s", requiredIDs));
        }
    }
}
