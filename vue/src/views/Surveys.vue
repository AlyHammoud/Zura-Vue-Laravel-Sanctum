<template>
  <div>
    <page-component>
      <template v-slot:header>
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Survey</h1>
          <router-link
            :to="{ name: 'SurveyCreate' }"
            class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 -mt-1 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Survey
          </router-link>
        </div>
      </template>

      <template v-slot:body>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          <SurveyListItem
            v-for="survey in surveys"
            :key="survey.id"
            :survey="survey"
            @delete="deleteSurvey(survey.id)"
          />
        </div>
      </template>
    </page-component>
  </div>
</template>

<script setup>
import { computed, watch, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import PageComponent from "../components/PageComponent.vue";
import SurveyListItem from "../components/SurveyListItem.vue";

const store = useStore();

const surveys = computed(() => store.state.surveys.data);

store.dispatch("getSurveys");

function deleteSurvey(id) {
  if (
    confirm(
      `Are you sure want to delete this survey? Operation can't be undone!!`
    )
  ) {
    store.dispatch('deleteSurvey', id).then(() => {
      store.dispatch('getSurveys');
    })
  }
}
</script>

<style></style>
