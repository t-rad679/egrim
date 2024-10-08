<script setup lang="ts">
import { TarotSuitAlias } from "@client-types"
import {
    computed,
    defineModel,
    ref,
    watch,
} from "vue"

import { doAllTarotSuitsQuery } from "@/api/tarotSuit/queries/fetchAllTarotSuits.js"
import { DeepPartial } from "@/utils/DeepPartial"
import { createFieldRequiredRule } from "@/utils/validationUtils.js"

const emit = defineEmits(["remove"])
const modelValue = defineModel<DeepPartial<TarotSuitAlias>>({ required: true })
const props = defineProps({
    index: {
        type: Number,
        required: true,
    },
    alreadyUsedSuits: {
        type: Array<string>,
        required: false,
        default: [],
    },
})

const selectedSuit = ref(modelValue.value.suit?.name)
const currentAlias = ref(modelValue.value.name)

watch([selectedSuit, currentAlias], ([newSuit, newAlias]) => {
    modelValue.value = {
        suit: {
            name: newSuit,
        },
        name: newAlias,
    }
})

const { result, onError } = doAllTarotSuitsQuery()

const suits = computed(() => (
    result.value?.tarotSuits?.map((suit) => suit.name).filter((suit) => (
        !props.alreadyUsedSuits?.includes(suit)
    )) || []
))

onError((error) => {
    console.log(error)
})

const suitRules = [createFieldRequiredRule("Suit")]
const aliasRules = [createFieldRequiredRule("Alias")]
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-select
          v-model="selectedSuit"
          :items="suits"
          :rules="suitRules"
          item-text="name"
          item-value="id"
          label="Tarot Suit"
          outlined
          class="required"
        />
      </v-col>
      <v-col cols="5">
        <v-text-field
          v-model="currentAlias"
          :rules="aliasRules"
          label="Alias"
          outlined
          class="required"
        />
      </v-col>
      <v-col cols="2">
        <v-btn
          icon
          @click="emit('remove', props.index)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
