package fi.tuni.koodimankelit.antibiootit.builder;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import fi.tuni.koodimankelit.antibiootit.database.data.Antibiotic;
import fi.tuni.koodimankelit.antibiootit.database.data.Diagnosis;
import fi.tuni.koodimankelit.antibiootit.database.data.Mixture;
import fi.tuni.koodimankelit.antibiootit.database.data.Strength;
import fi.tuni.koodimankelit.antibiootit.database.data.Tablet;
import fi.tuni.koodimankelit.antibiootit.database.data.TargetedInfo;
import fi.tuni.koodimankelit.antibiootit.database.data.Treatment;
import fi.tuni.koodimankelit.antibiootit.exceptions.NoAntibioticTreatmentException;
import fi.tuni.koodimankelit.antibiootit.exceptions.TreatmentNotFoundException;
import fi.tuni.koodimankelit.antibiootit.models.APITargetedInfo;
import fi.tuni.koodimankelit.antibiootit.models.AntibioticTreatment;
import fi.tuni.koodimankelit.antibiootit.models.DiagnosisResponse;

/**
 * Builder for diagnosis response. Includes only suitable treatments 
 */
public class DiagnosisResponseBuilder {
    private final Diagnosis diagnosis;
    private final double weight;
    private final boolean usePenicillinAllergic;
    private final boolean useAnyInfection;
    private final boolean isMixture;

    private static int PRIMARY_CHOICE = 1;
    private static int SECONDARY_CHOICE = 2;
    private static int PENICILLIN_ALLERGIC_CHOICE = 3;
    private static int INFECTION_PRIMARY_CHOICE = 4;
    private static int INFECTION_SECONDARY_CHOICE = 5;

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
     * @param useAnyInfection True, if any infection option should be used
     */
    public DiagnosisResponseBuilder(Diagnosis diagnosis, double weight, boolean usePenicillinAllergic, boolean useAnyInfection, boolean isMixture) {
        this.diagnosis = diagnosis;
        this.weight = weight;
        this.usePenicillinAllergic = usePenicillinAllergic;
        this.useAnyInfection = useAnyInfection;
        this.isMixture = isMixture;
    }

    
    /** 
     * Build diagnosis response object
     * @return DiagnoisResponse generated instance
     * @throws NoAntibioticTreatmentException is thrown if diagnosis has no antibiotics as treatment
     */
    public DiagnosisResponse build() {

        DiagnosisResponse diagnosisResponse = new DiagnosisResponse(diagnosis.getId(), diagnosis.getEtiology(), diagnosis.getInfo());

        // Check if diagnosis has antibiotics as treatment
        if (this.diagnosis.getTreatments().isEmpty()) {
            throw new NoAntibioticTreatmentException(diagnosis);
        }

        List<Treatment> treatments = getTreatments();

        for(Treatment treatment : treatments) {
            Antibiotic antibiotic = getSuitableAntibiotic(treatment, isMixture);

            AntibioticTreatmentBuilder builder;
            if(antibiotic instanceof Mixture) {
                builder = new MixtureBuilder((Mixture) antibiotic, weight);

            } else {
                builder = new TabletBuilder((Tablet) antibiotic, weight);
            }

            AntibioticTreatment antibioticTreatment = builder.build();
            diagnosisResponse.addTreatment(antibioticTreatment);

        }

        List<TargetedInfo> targetedInfos = getTargetedInfos();

        for(TargetedInfo targetedInfo : targetedInfos) {
            APITargetedInfo apiTargetedInfo = new APITargetedInfo(targetedInfo.getCheckbox(), targetedInfo.getText());
            diagnosisResponse.addTargetedInfo(apiTargetedInfo);
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
     * Returns targeted infos
     * @return List<TargetedInfo> targeted info
     */
    private List<TargetedInfo> getTargetedInfos() {
        List<TargetedInfo> targetedInfos = new ArrayList<>();

        for(TargetedInfo targetedInfo : this.diagnosis.getTargetedInfo()) {
            targetedInfos.add(targetedInfo);
        }

        return targetedInfos;
    }

    
    /** 
     * Return True if treatment is suitable based on penicillin allergy
     * @param treatment specific treatment
     * @return boolean True, if treatment is suitable
     */
    private boolean isSuitableTreatment(Treatment treatment) {
        if(this.usePenicillinAllergic && !this.useAnyInfection) {
            return PENICILLIN_ALLERGIC_CHOICE == treatment.getChoice();
        } else if(this.useAnyInfection && !this.usePenicillinAllergic) {
            if((diagnosis.getName().equals("Streptokokkitonsilliitti") || diagnosis.getName().equals("Perianaalidermatiitti"))&& weight < 35) {
                return INFECTION_PRIMARY_CHOICE == treatment.getChoice();
            } else {
                return INFECTION_PRIMARY_CHOICE == treatment.getChoice() || INFECTION_SECONDARY_CHOICE == treatment.getChoice();
            }
        } else if(this.useAnyInfection && this.usePenicillinAllergic) {
            return PENICILLIN_ALLERGIC_CHOICE == treatment.getChoice();
        } else {
            return PRIMARY_CHOICE == treatment.getChoice() || SECONDARY_CHOICE == treatment.getChoice();
        }
    }

    
    /** 
     * Returns suitable antibiotic choise from given treatment based on weight
     * @param treatment specific treatment
     * @return Antibiotic preferred antibiotic
     */
    private Antibiotic getSuitableAntibiotic(Treatment treatment, boolean isMixture) {
        // Sort all antibiotics, the option with highest strength first
        List<Antibiotic> antibiotics = treatment.getAntibiotics();
        antibiotics.sort(antibioticComparator);
        
        // Iterate all antibiotics and their strengths
        // Choose antibiotic based on the minimum weight requirement
        for(Antibiotic antibiotic : antibiotics) {
            for(Strength strength : antibiotic.getStrength()) {
                if(isMixture == true) {
                    if(strength.getMinWeight() == 0 || strength.getMinWeight() == 4) {
                        return antibiotic;
                    }
                } else {
                    if(strength.getMinWeight() <= this.weight) {
                        return antibiotic;
                    }
                }
            }
        }
        
        throw new TreatmentNotFoundException();
        
    }

}
