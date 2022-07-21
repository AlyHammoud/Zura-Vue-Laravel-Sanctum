<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SurveyQuestion;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rules\Enum;
use App\Http\Resources\SurveyResource;
use App\Http\Requests\StoreSurveyRequest;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyQuestionResource;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\URL;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return SurveyResource::collection(Survey::where('user_id', $user->id)->paginate(3));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSurveyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();

        //check if image was given and save on local file system
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']); //create saveImage function by own
            $data['image'] = $relativePath;
        }

        $survey = Survey::create($data);

        //add questions

        foreach ($data['questions'] as $question) {
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question); //created by me
        }

        // return response($survey, 200); instead of sending all data back use Resource to send back as json with specific cols we need, more secure and managable
        return new SurveyResource($survey);
    }

    private function createQuestion($data)
    {
        
        if (is_array($data['data'])) {
            $data['data'] = json_encode(($data['data']));
        }

        $validator = Validator::make($data, [
            'question' => 'required|string',
            'type' => ['required', Rule::in([
                Survey::TYPE_TEXT,
                Survey::TYPE_TEXTAREA,
                Survey::TYPE_SELECT,
                Survey::TYPE_RADIO,
                Survey::TYPE_CHECKBOX,
            ])],
            'description' => 'nullable|string',
            'data' => 'present',
            'survey_id' => 'exists:App\Models\Survey,id'
        ]);

        return SurveyQuestion::create($validator->validated());
    }

    private function saveImage($image)
    {
        //image is base64 encoded, so we need to decode it.

        //check if image is valid base64 string 
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            //take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1); //remove befrore ,  data:image/png;base64,iVBORw0KGg....

            //Get file extension
            $type = strtolower($type[1]); //jpg, png, gif

            //check if file is an image 
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png', 'svg'])) {
                throw new \Exception('invalid image type');
            }

            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;

        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;

        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }

        file_put_contents($relativePath, $image);

        return $relativePath;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();

        if ($user->id !== $survey->user_id) {
            return abort(403, "Unauthorized acition. Show");
        }

        // foreach($survey['questions'] as $key => $question){
        //     $survey['questions'][$key]->data = json_decode($survey['questions'][$key]->data);
        // }
        // $survey['image_url'] = URL::to($survey['image']);
        // return response()->json(([
        //     'data' => $survey
        // ]));

        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSurveyRequest  $request
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            //if there is an old image, remove it
            if ($survey->image) {
                $absolutePath = public_path(($survey->image));
                File::delete($absolutePath);
            }
        }

        //$survey->update($data);

        //Get ids of existing questions(get all questions from db)
        $existingIds = $survey->questions()->pluck('id')->toArray();

        //get ids of new quetions(get the new id from the request and validated as data)
        $newIds = Arr::pluck($data['questions'], 'id');
        // $newIds = collect($data['questions'])->pluck('id')->toArray();

        //find questions to delete(if any of the all ids not found in the request, then put to delete)
        $toDelete = array_diff($existingIds, $newIds);

        //find questions to add
        $toAdd = array_diff($newIds, $existingIds);

        //delete questions by $toDelete array
        SurveyQuestion::destroy($toDelete);

        //create new questions
        foreach($data['questions'] as $question){
            if(in_array($question['id'], $toAdd)){
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }
        
        //update existing questins
        $questionMap = collect($data['questions'])->keyBy('id');  //re-arrange the keys of the data not 0 1 2.., but as id of the question
        foreach($survey->questions as $question ){
            if(isset($questionMap[$question->id])){
                $this->updateQuestion($question, $questionMap[$question->id]);
            }
        }
        return new SurveyResource($survey);
    }

    private function updateQuestion(SurveyQuestion $question, $data){
        if(is_array($data['data'])){
            $data['data'] = json_encode($data['data']);
        }

        $validator = Validator::make($data, [
            'id' => 'exists:App\Models\SurveyQuestion,id',
            'question' => 'required|string',
            'type' =>
            ['required', Rule::in([
                Survey::TYPE_TEXT,
                Survey::TYPE_TEXTAREA,
                Survey::TYPE_SELECT,
                Survey::TYPE_RADIO,
                Survey::TYPE_CHECKBOX,
            ])],

            'description' => 'nullable|string',
            'data' => 'present'
        ]);
        
        return $question->update($validator->validated());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Survey  $survey
     * @return \Illuminate\Http\Response
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();

        if ($user->id !== $survey->user_id) {
            return abort(403, "Unauthorized action. Destroy");
        }

        $survey->delete();

        //if there is an old image, remove it
        if ($survey->image) {
            $absolutePath = public_path(($survey->image));
            File::delete($absolutePath);
        }

        return response('', 204);
    }
}
