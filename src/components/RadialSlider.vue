<template>
  <figure class="radial-slider" ref="radialSlider">
    <div id="ap"></div>
  </figure>
</template>


<script setup>
import { onMounted, ref, reactive } from 'vue';
import {Slider} from './radialSlider'

onMounted(() => {
  const opts = {
            DOMselector: '#ap',
            sliders: [
                {
                    radius: 100,
                    min: 0,
                    max: 100,
                    step: 10,
                    initialValue: 50,
                    color: '#fdcb6e',
                    // displayName: 
                },
            ]
        };

        // instantiate the slider
        const slider = new Slider(opts);
        slider.draw();

})

 
</script>

<style lang="scss">
.slider__legend {
  padding: 1rem 3rem 0 0;
  list-style: none;
}

.slider__legend h2 {
  margin-bottom: 1rem;
}

.slider__legend li {
  display: flex;
  margin-bottom: 1rem;
}

.slider__legend li span {
  display: inline-block;
}

.slider__legend li span:first-child {
  height: 20px;
  width: 20px;
  margin-bottom: -2px;
}

.slider__legend li span:nth-child(2) {
  margin: 0 0.5rem;
}

.slider__legend li span:last-child {
  font-size: 1.25rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums lining-nums;
  min-width: 60px;
}
</style>