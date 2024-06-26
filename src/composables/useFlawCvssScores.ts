import { putFlawCvssScores, postFlawCvssScores } from '@/services/FlawService';
import { computed, ref, watch, type Ref } from 'vue';
import type { ZodFlawType } from '@/types/zodFlaw';

// TODO: This composable should be ideally refactored into a more modular
// solution when CVSSv4 starts being used
export function useFlawCvssScores(flaw: Ref<ZodFlawType>) {

  function getCvssData(issuer: string, version: string) {
    return flaw.value.cvss_scores.find(
      (assessment) => assessment.issuer === issuer && assessment.cvss_version === version
    );
  }

  const wasCvssModified = ref(false);
  const flawRhCvss3 = ref(
    getCvssData('RH', 'V3') || {
      vector: null,
      uuid: null,
      issuer: null,
      // comment: null,
      comment: 'hardcoded comment', // TODO: remove this line when the comment field is added to the UI
      created_dt: null,
      score: null,
    }, // empty for creating a flaw, or if no CVSS data exists
  );

  watch(flawRhCvss3, () => { wasCvssModified.value = true; }, { deep: true });

  const flawNvdCvss3 = computed(() => getCvssData('NIST', 'V3'));

  const formatScore = (score: any) => score?.toFixed(1);

  const nvdCvss3String = computed(() => {
    const values = [formatScore(flawNvdCvss3.value?.score), flawNvdCvss3.value?.vector].filter(Boolean);
    return values.join('/') || '-';
  });

  const rhCvss3String = computed(() => {
    const values = [formatScore(flawRhCvss3.value?.score), flawRhCvss3.value?.vector].filter(Boolean);
    return values.join('/');
  });

  const shouldDisplayEmailNistForm = computed(() => {
    if (rhCvss3String.value === '' || nvdCvss3String.value === '-') {
      return false;
    }
    return `${rhCvss3String.value}` !== `${nvdCvss3String.value}`;
  });

  const highlightedNvdCvss3String = computed(() => {
    const result = [];
    const nvdCvssValue = nvdCvss3String.value;
    const cvssValue = rhCvss3String.value;
    const maxLength = Math.max(nvdCvssValue.length, cvssValue.length);

    for (let i = 0; i < maxLength; i++) {
      const charFromFlaw = i < nvdCvssValue.length ? nvdCvssValue[i] : '';
      const charFromCvss = i < cvssValue.length ? cvssValue[i] : '';
      result.push({
        char: charFromFlaw,
        isHighlighted: shouldDisplayEmailNistForm.value && charFromFlaw !== charFromCvss,
      });
    }

    return result;
  });

  async function saveCvssScores() {
    if (flawRhCvss3.value.created_dt) {
      return putFlawCvssScores(flaw.value.uuid, flawRhCvss3.value.uuid || '', flawRhCvss3.value as unknown);
    }

    const requestBody = {
      // "score":  is recalculated based on the vector by OSIDB and does not need to be included
      comment: flawRhCvss3.value.comment,
      cvss_version: 'V3',
      issuer: 'RH',
      vector: flawRhCvss3.value.vector,
      embargoed: flaw.value.embargoed,
    };
    return postFlawCvssScores(flaw.value.uuid, requestBody as unknown);
  }

  return {
    wasCvssModified,
    flawRhCvss3,
    rhCvss3String,
    nvdCvss3String,
    highlightedNvdCvss3String,
    shouldDisplayEmailNistForm,
    saveCvssScores,
  };
}
