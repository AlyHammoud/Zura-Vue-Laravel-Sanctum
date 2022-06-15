//vue Routes:
    view-router is the main and all will redirect to
    view-router can be nested as children, so all links redirect inside parent

in <script setup>
    
    const props = defineProps({})
    const emits = defineEmits([]) //no need to import them

slot name="abc"  // in parent component

in child: first we define template v-slot:abc

if not named slot, no need to add template

/////////////////
Survey Page: views all surveys posted

    then: create new  and  clicking on edit a survey:
        uses the same view page: SurveyView

        but in page SurveyView we are checking for route.params.id if exists then it is editing,
        else it is creating new one

