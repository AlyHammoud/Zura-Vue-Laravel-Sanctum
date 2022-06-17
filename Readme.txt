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

    Note: in surveyController when creating or updating or getting data, response can be done: 
    
        1. return response($result, 200); instead of sending all data back use Resource to send back as json with specific cols we need, more secure and managable
        2. return new SurveyResource($result);

        we might think that these 2 are same, but return new SurveyResource is more managable and secure for, since it is 
            good for managing json formats,
            dont return back all data which might have some sensitive data,


        


//////
    create a controller for api:
        sail artisan make:controller SurveyController --model=Survey --api --request   
            //this command create a resource controller, but without create and edit, since using --api 
                which omits these two functions

    create a survey resource:
        sail artisan make:resource SurveyResource

        then install laravel-sluggable


////
Image display vue js:
    function onImageChoose(ev){
  const file = ev.target.files[0];

  const reader = new FileReader(); // for image preview
  reader.onload = () => {
    //the field to send on backend and apply validation
    model.value.image = reader.result;

    //The field to display on front end
    model.value.image_url = reader.result;
  }
  reader.readAsDataURL(file);
}
