<script>
import { ref, onMounted  } from 'vue';
import { getNovel } from "../api";

const props = defineProps({
    category: {
        type: Number,
        default: ''
    }
});

const book = ref([]);

const init = () => {
    const param = {
        novel_category: props.category,
        
    }
}

</script>

<template>

</template>

<style scoped>

</style>