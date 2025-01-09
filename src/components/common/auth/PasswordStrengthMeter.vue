<template>
  <div class="strength-meter">
    <div class="strength-meter-bar">
      <div class="strength-meter-bar--fill" :data-score="strengthPercentage"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'

const props = defineProps<{
  password: string
}>()

const emit = defineEmits(['score-change'])

const strengthPercentage = computed(() => {
  const password = props.password

  const lengthCriteria = password.length >= 8
  const numberCriteria = /[0-9]/.test(password)
  const uppercaseCriteria = /[A-Z]/.test(password)
  const lowercaseCriteria = /[a-z]/.test(password)
  const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  let strength = 0

  if (lengthCriteria) strength += 20
  if (numberCriteria) strength += 20
  if (uppercaseCriteria) strength += 20
  if (lowercaseCriteria) strength += 20
  if (specialCharCriteria) strength += 20

  emit('score-change', strength);

  return strength
})
</script>

<style scoped lang="scss">
.strength-meter {
  border-radius: 5px;
  height: 4px;
  margin-top: 5px;

  &-bar {
    position: relative;
    height: 4px;
    margin: 10px auto 3px;
    background-color: hsl(var(--input));
    border-radius: 5px;

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: 10;
      width: 20%;
      height: inherit;
      border-width: 0 5px;
      border-style: solid;
      border-color: #000;
      background-color: transparent;
    }

    &::before {
      left: 20%;
    }

    &::after {
      right: 20%;
    }

    &--fill {
      position: absolute;
      width: 0;
      height: inherit;
      transition: width 0.5s ease-in-out, background 0.25s;
      border-radius: inherit;
      background-color: transparent;

      &[data-score='20'] {
        width: 20%;
        background-color: darken(#F56C6C, 10%);
      }

      &[data-score='40'] {
        width: 40%;
        background-color: #F56C6C;
      }

      &[data-score='60'] {
        width: 60%;
        background-color: #E6A23C;
      }

      &[data-score='80'] {
        width: 80%;
        background-color: lighten(#95d475, 1%);
      }

      &[data-score='100'] {
        width: 100%;
        background-color: #67C23A;
      }
    }
  }
}
</style>