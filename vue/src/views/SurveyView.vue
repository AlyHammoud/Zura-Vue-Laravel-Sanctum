<template>
  <page-component>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ route.params.id ? model.title : "Create Survey" }}
        </h1>

        <button
          v-if="route.params.id && !surveyLoading"
          type="button"
          class="py-2 px-3 flex text-white bg-red-500 rounded-md hover:bg-red-600"
          @click="deleteSurvey"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete Survey
        </button>
      </div>
    </template>

    <template v-slot:body>
      <div v-if="surveyLoading" class="flex justify-center">Loading...</div>
      <form v-else @submit.prevent="saveSurvey">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div class="">
              <label class="block text-sm font-medium text-gray-700">
                Image
              </label>
              <div class="mt-1 flex items-center">
                <img
                  v-if="model.image_url"
                  :src="model.image_url"
                  :alt="model.title"
                  class="w-64 h-48 object-cover"
                />
                <span
                  v-else
                  class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-[80%] w-[80%] text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <button
                  type="button"
                  class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <input
                    type="file"
                    @change="onImageChoose"
                    class="absolute left-0 top-0 right-0 bottom-0 sm:text-[2px] opacity-0 cursor-pointer"
                  />
                  Change
                </button>
              </div>
            </div>
            <!-- image -->

            <!-- Title -->
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700"
                >Title</label
              >
              <input
                type="text"
                name="title"
                id="title"
                v-model="model.title"
                autocomplete="survey_title"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <!--/ Title -->

            <!-- Description -->
            <div>
              <label
                for="about"
                class="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div class="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  v-model="model.description"
                  autocomplete="survey_description"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Describe your survey"
                  v-html="model.description"
                />
              </div>
            </div>
            <!-- Description -->

            <!-- Expire Date -->
            <div>
              <label
                for="expire_date"
                class="block text-sm font-medium text-gray-700"
                >Expire Date</label
              >
              <input
                type="date"
                name="expire_date"
                id="expire_date"
                v-model="model.expire_date"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <!--/ Expire Date -->

            <!-- Status -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="status"
                  name="status"
                  type="checkbox"
                  v-model="model.status"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="status" class="font-medium text-gray-700"
                  >Active</label
                >
              </div>
            </div>
            <!--/ Status -->
          </div>

          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <h3
              class="text-2xl font-semibold flex items-center justify-between"
            >
              Questions

              <!-- Add new question -->
              <button
                type="button"
                @click="addQuestion()"
                class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Add Question
              </button>
              <!--/ Add new question -->
            </h3>

            <div
              v-if="!model.questions.length"
              class="text-center text-gray-600"
            >
              You don't have any questions created
            </div>

            <!-- Question Editor -->
            <div
              v-for="(question, index) in model.questions"
              :key="question.id"
            >
              <QuestionEditor
                :question="question"
                :index="index"
                @change="questionChange"
                @addQuestion="addQuestion"
                @deleteQuestion="deleteQuestion"
              />
            </div>
            <!-- Question Editor -->

            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </template>
  </page-component>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/Editor/QuestionEditor.vue";
import { v4 as uuidv4 } from "uuid";
import { computed, watch, watchEffect } from "@vue/runtime-core";

const route = useRoute();
const store = useStore();
const router = useRouter();

const model = ref({
  title: "",
  status: false,
  description: null,
  image_url: null,
  expire_date: null,
  questions: [],
});

const surveyLoading = computed(() => {
  return store.state.currentSurvey.loading;
});

// when the current survey data change update local model variable
watch(
  () => store.state.currentSurvey.data,
  (newValue, oldValue) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newValue)),
      status: newValue.status !== "draft",
    };
  }
);

watchEffect(() => {
  if (route.params.id) {
    store.dispatch("getSurvey", route.params.id);
  }
});

function onImageChoose(ev) {
  const file = ev.target.files[0];

  const reader = new FileReader(); // for image preview
  reader.onload = () => {
    //the field to send on backend and apply validation
    model.value.image = reader.result;

    //The field to display on front end
    model.value.image_url = reader.result;
  };
  reader.readAsDataURL(file);
}

function addQuestion(index = null) {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: null,
    data: {},
  };
  model.value.questions.splice(index, 0, newQuestion);
}
function questionChange(question) {
  // Important to explicitelly assign question.data.options, because otherwise it is a Proxy object
  // and it is lost in JSON.stringify()
  if (question.data.options) {
    question.data.options = [...question.data.options];
  }
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
}

function deleteQuestion(question) {
  model.value.questions = model.value.questions.filter((q) => q !== question);
}

async function saveSurvey() {
  if (model.value.id) {
    alert("existed");
  } else {
    alert("not");
  }
  await store.dispatch("saveSurvey", model.value).then(({ data }) => {
    router.push({ name: "SurveyView", params: { id: data.data.id } });
  });
}

function deleteSurvey(){
  if(confirm("Are you sure want to delete?")){
    store.dispatch("deleteSurvey", model.value.id).then(() => {
      router.push({name: "Surveys"})
    });
  }
}
</script>

<style></style>
