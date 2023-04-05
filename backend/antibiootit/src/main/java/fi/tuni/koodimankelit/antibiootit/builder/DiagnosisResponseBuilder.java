package fi.tuni.koodimankelit.antibiootit.builder;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import fi.tuni.koodimankelit.antibiootit.database.data.Antibiotic;
import fi.tuni.koodimankelit.antibiootit.database.data.Diagnosis;
import fi.tuni.koodimankelit.antibiootit.database.data.Mixture;
import fi.tuni.koodimankelit.antibiootit.database.data.Strength;
import fi.tuni.koodimankelit.antibiootit.database.data.Tablet;
import fi.tuni.koodimankelit.antibiootit.database.data.Treatment;
import fi.tuni.koodimankelit.antibiootit.exceptions.NoAntibioticTreatmentException;
import fi.tuni.koodimankelit.antibiootit.models.AntibioticTreatment;
import fi.tuni.koodimankelit.antibiootit.models.DiagnosisResponse;

/**
 * Builder for diagnosis response. Includes only suitable treatments 
 */
public class DiagnosisResponseBuilder {
    private final Diagnosis diagnosis;
    private final double weight;
    private final boolean usePenicillinAllergic;

    private static int PRIMARY_CHOICE = 1;
    private static int SECONDARY_CHOICE = 2;
    private static int PENICILLIN_ALLERGIC_CHOICE = 3;
    private static int NO_ANTIBIOTIC_CHOICE = 0;

    private Comparator<Strength> highestStrengthComparator = new Comparator<Strength>() {

        @Override
        public int compare(Strength o1, Strength o2) {
            Integer minWeight1 = Integer.valueOf(o1.getMinWeight());
            Integer minWeight2 = Integer.valueOf(o2.getMinWeight());

            // Higher first
            return minWeight2.compareTo(minWeight1);
        }
    };

    private Comparator<Antibiotic> antibioticComparator = new Comparator<Antibiotic>() {

        @Override
        public int compare(Antibiotic o1, Antibiotic o2) {
            List<Strength> strengths1 = o1.getStrength();
            List<Strength> strengths2 = o2.getStrength();

            strengths1.sort(highestStrengthComparator);
            strengths2.sort(highestStrengthComparator);

            // Highest minimum weights
            Integer minWeight1 = strengths1.get(0).getMinWeight();
            Integer minWeight2 = strengths2.get(0).getMinWeight();

            // Higher minimum weight first
            return minWeight2.compareTo(minWeight1);

        }
    };



    /**
     * Default constructor
     * @param diagnosis Database entity instance
     * @param weight weight in kilograms
     * @param usePenicillinAllergic True, if penicillin allergic option should be used
     */
    public DiagnosisResponseBuilder(Diagnosis diagnosis, double weight, boolean usePenicillinAllergic) {
        this.diagnosis = diagnosis;
        this.weight = weight;
        this.usePenicillinAllergic = usePenicillinAllergic;
    }

    
    /** 
     * Build diagnosis response object
     * @return DiagnoisResponse generated instance
     */
    public DiagnosisResponse build() {

        DiagnosisResponse diagnosisResponse = new DiagnosisResponse(diagnosis.getId(), diagnosis.getEtiology(), diagnosis.getInfo());
        List<Treatment> treatments = getTreatments();

        for(Treatment treatment : treatments) {
            Antibiotic antibiotic = getSuitableAntibiotic(treatment);

            AntibioticTreatment antibioticTreatment;
            if(antibiotic instanceof Mixture) {
                MixtureBuilder builder = new MixtureBuilder((Mixture) antibiotic, weight);
                antibioticTreatment = builder.buildMixture();
            } else {
                TabletBuilder builder = new TabletBuilder((Tablet) antibiotic, weight);
                antibioticTreatment = builder.buildTablet();
            }
            
            diagnosisResponse.addTreatment(antibioticTreatment);
        }

        return diagnosisResponse;
        
    }

    
    /** 
     * Returns all suitable treatments based on penicillin allergy
     * @return List<Treatment> suitable treatments
     */
    private List<Treatment> getTreatments() {

        List<Treatment> treatments = new ArrayList<>();
        for(Treatment treatment : this.diagnosis.getTreatments()) {
            if(isSuitableTreatment(treatment)) {
                treatments.add(treatment);
            }
        }

        // Sort by treatment choice: primary, secondary, penicillinAllergic
        treatments.sort((a, b) -> Integer.valueOf(a.getChoice()).compareTo(Integer.valueOf(b.getChoice())));
        return treatments;
        
    }

    
    /** 
     * Return True if treatment is suitable based on penicillin allergy
     * @param treatment specific treatment
     * @return boolean True, if treatment is suitable
     * @throws NoAntibioticTreatmentException if diagnosis has no antibiotic treatment
     */
    private boolean isSuitableTreatment(Treatment treatment) {
        if(this.usePenicillinAllergic) {
            return PENICILLIN_ALLERGIC_CHOICE == treatment.getChoice();
        }
        else if (NO_ANTIBIOTIC_CHOICE == treatment.getChoice()) {
            throw new NoAntibioticTreatmentException(this.diagnosis);
        }
        else {
            return PRIMARY_CHOICE == treatment.getChoice() || SECONDARY_CHOICE == treatment.getChoice();
        }
    }

    
    /** 
     * Returns suitable antibiotic choise from given treatment based on weight
     * @param treatment specific treatment
     * @return Antibiotic preferred antibiotic
     */
    private Antibiotic getSuitableAntibiotic(Treatment treatment) {

        // Sort all antibiotics, the option with highest strength first
        List<Antibiotic> antibiotics = treatment.getAntibiotics();
        antibiotics.sort(antibioticComparator);
        
        // Iterate all antibiotics and their strengths
        // Choose antibiotic based on the minimum weight requirement
        for(Antibiotic antibiotic : antibiotics) {
            for(Strength strength : antibiotic.getStrength()) {
                if(strength.getMinWeight() <= this.weight) {
                    return antibiotic;
                }
            }
        }
        return null;
        
    }

}
