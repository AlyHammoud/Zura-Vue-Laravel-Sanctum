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

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <div
          class="flex flex-col py-4 px-6 shadow-md bg-gray-200 hover:bg-gray-50 h-[470px]"
          v-for="survery in surveys"
          :key="survery.id"
        >
          <img :src="survery.image" class="w-full h-48 object-cover" />
          <h4 class="mt-4 text-lg font-bold">{{ survery.title }}</h4>
          <div class="overflow-hidden flex-1" v-html="survery.description"></div>
        
            <div class="flex justify-between items-center mt-3">
                <router-link to="{name: 'SurveyView', params: {id: survery,id} }"></router-link>
            </div>
        </div>
      </div>

    </page-component>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import PageComponent from "../components/PageComponent.vue";

const store = useStore();

const surveys = computed(() => store.state.surveys);
</script>

<style></style>
