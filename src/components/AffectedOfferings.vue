<script setup lang="ts">
import { computed, toRefs, ref, watch } from 'vue';

import { type ZodAffectType } from '@/types/zodAffect';
import { uniques } from '@/utils/helpers';
import { useTrackers } from '@/composables/useTrackers';

import AffectExpandableForm from '@/components/AffectExpandableForm.vue';
import AffectsTrackers from '@/components/AffectsTrackers.vue';
import LabelCollapsible from '@/components/widgets/LabelCollapsible.vue';
import OsimButton from '@/components/widgets/OsimButton.vue';

const props = defineProps<{
  flawId: string;
  theAffects: ZodAffectType[];
  affectsToDelete: ZodAffectType[];
  error: Record<string, any>[] | null;
}>();

const emit = defineEmits<{
  'file-tracker': [value: object];
  'affect:remove': [value: ZodAffectType];
  'affect:recover': [value: ZodAffectType];
  'add-blank-affect': [];
}>();

const { theAffects, affectsToDelete } = toRefs(props);

const { getUpdateStreamsFor } = useTrackers(props.flawId, props.theAffects);

const affectsNotBeingDeleted = computed(
  () => theAffects.value.filter((affect) => !affectsToDelete.value.includes(affect))
);

const affectedModules = computed(() => uniques(theAffects.value.map((affect) => affect.ps_module)));

const expandedModules = ref<Record<string, boolean>>({});

const affectsWithModuleName = (moduleName: string) =>
  theAffects.value.filter((affect) => affect.ps_module === moduleName);

const shouldShowTrackers = ref(false);
const expandedAffects = ref(new Map());
updateAffectsExpandedState(theAffects.value);

watch(theAffects, (nextValue) => {
  expandedModules.value = affectedModules.value.reduce((modules: Record<string, boolean>, moduleName: string) => {
    modules[moduleName] = areAnyComponentsExpandedIn(moduleName) || expandedModules.value[moduleName] || false;
    return modules;
  }, {});
  updateAffectsExpandedState(nextValue);
}, { deep: true, immediate: true });

const areAnyComponentsExpanded = computed(
  () => affectedModules.value.some((moduleName) => affectsWithModuleName(moduleName).some(isExpanded))
);

const isAnythingExpanded = computed(() => (
  areAnyComponentsExpanded.value
  || Object.values(expandedModules.value).some(Boolean)
));

const isAnythingCollapsed = computed(() => (
  !Object.values(expandedModules.value).every(Boolean)
));

function areAnyComponentsExpandedIn (moduleName: string) {
  return affectsWithModuleName(moduleName).some(isExpanded);
}

function updateAffectsExpandedState (affects: any[]) {
  for (const affect of affects) {
    const maybeValue = expandedAffects.value.get(affect);
    expandedAffects.value.set(affect, maybeValue ?? ref(false));
  }
}

function isExpanded(affect: ZodAffectType) {
  return expandedAffects.value.get(affect)?.value ?? true; // new affect is expanded by default;
}

function collapsePsModuleComponents(moduleName: string) {
  const affects = affectsWithModuleName(moduleName);
  for (const affect of affects) {
    expandedAffects.value.set(affect, ref(false));
  }
}

function collapseAll() {
  for (const moduleName in expandedModules.value) {
    collapsePsModuleComponents(moduleName);
    expandedModules.value[moduleName] = false;
  }
}

function expandAll() {
  for (const moduleName in expandedModules.value) {
    expandedModules.value[moduleName] = true;
  }
}

function togglePsComponentExpansion(affect: ZodAffectType) {
  const isExpanded = expandedAffects.value.get(affect);
  isExpanded.value = !isExpanded.value;
  expandedAffects.value.set(affect, isExpanded);
}

function togglePsModuleExpansion(moduleName: string) {
  expandedModules.value[moduleName] = !expandedModules.value[moduleName];
  if (!expandedModules.value[moduleName]) {
    collapsePsModuleComponents(moduleName);
  }
}

function moduleComponentName(moduleName: string = '<module not set>', componentName: string) {
  return `${moduleName}/${componentName}`;
}

defineExpose({ togglePsModuleExpansion, togglePsComponentExpansion, isExpanded });

</script>

<template>
  <div v-if="theAffects" class="osim-affects my-2">
    <h4>Affected Offerings</h4>
    <AffectsTrackers
      v-show="shouldShowTrackers"
      :flawId="flawId"
      :theAffects="affectsNotBeingDeleted"
      @affects-trackers:hide="shouldShowTrackers = false"
    />
    <div class="my-2 py-2">
      <button
        v-if="isAnythingCollapsed"
        type="button"
        class="btn btn-sm btn-secondary me-2"
        @click="expandAll()"
      >
        Expand All Affects
      </button>
      <button
        v-if="isAnythingExpanded"
        type="button"
        class="btn btn-sm btn-secondary"
        @click="collapseAll()"
      >
        Collapse All Affects
      </button>
      <button
        v-show="!shouldShowTrackers"
        type="button"
        class="button btn btn-sm btn-black text-white"
        @click="shouldShowTrackers = !shouldShowTrackers"
      >
        <!-- <i class="bi bi-journal-plus"></i> -->
        <i class="bi bi-binoculars"></i>
        Manage Trackers
      </button>
    </div>

    <div v-for="(moduleName, moduleIndex) in affectedModules" :key="`ps_module-${moduleIndex}`">
      <LabelCollapsible
        :isExpanded="expandedModules[moduleName] ?? false"
        class="mb-1"
        @setExpanded="togglePsModuleExpansion(moduleName)"
      >
        <template #label>
          <label class="mx-2 form-label">
            {{ moduleName }}
          </label>
          <span class="badge bg-light-yellow text-dark border border-warning">
            {{ `${Object.keys(affectsWithModuleName(moduleName)).length} affected` }}
          </span>
        </template>
        <template #buttons>
          <div v-if="expandedModules[moduleName]" class="btn-group">
            <div class="dropdown">
              <button
                class="btn btn-white btn-outline-black btn-sm dropdown-toggle ms-2"
                type="button"
                data-bs-toggle="dropdown"
              >
                Bulk Action
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#"> 🚧 Change Affected Module for all components</a>
                <a class="dropdown-item" href="#"> 🚧 Change Status for all components</a>
                <a class="dropdown-item" href="#"> 🚧 Auto-file for all components</a>
              </div>
            </div>
          </div>
        </template>
        <div
          v-for="(affect, index) in affectsWithModuleName(moduleName)"
          :key="affect.uuid || `new-affect-${index}`"
          class="osim-affected-offering"
        >
          <AffectExpandableForm
            :id="affect.uuid"
            v-model="affectsWithModuleName(moduleName)[index]"
            :affect="affect"
            :isExpanded="isExpanded(affect) ?? false"
            :error="error?.[theAffects.indexOf(affect)] ?? null"
            :updateStreams="getUpdateStreamsFor(moduleName, affect.ps_component)"
            @setExpanded="togglePsComponentExpansion(affect)"
            @affect:remove="emit('affect:remove', affect)"
            @file-tracker="emit('file-tracker', $event)"
          />
        </div>
      </LabelCollapsible>
    </div>
    <button type="button" class="btn btn-secondary mt-2" @click.prevent="emit('add-blank-affect')">
      Add New Affect
    </button>
    <div v-if="affectsToDelete.length" class="mt-3 row">
      <div class="col-auto alert alert-danger rounded-3 p-3">
        <h5>Affected Offerings To Be Deleted</h5>
        <div>
          <p
            v-for="(affect, affectIndex) in affectsToDelete"
            :key="affectIndex"
            class="p-0 "
          >
            <OsimButton
              class="m-0 py-0 osim-button btn-success btn btn-sm text-white"
              title="Recover"
              @click.prevent="emit('affect:recover', affect)"
            >
              <i class="bi bi-prescription2"></i>
              Recover
            </OsimButton>
            <span class="m-0 py-0 alert alert-warning">
              {{ moduleComponentName(affect.ps_module, affect.ps_component) }}
              {{ !affect.uuid ? "(doesn't exist yet in OSIDB)" : '' }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
