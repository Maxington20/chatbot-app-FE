<template>
    <div class="prompt-chatbot">
      <div class="input-container">
        <input
          class="input-field"
          v-model="prompt"
          placeholder="Enter your prompt"
        />
        <button class="send-button" @click="promptChatbot" :disabled="loading">
          {{ loading ? "Loading..." : "Send" }}
        </button>
      </div>
      <div class="response-container">
        <div v-if="isPointForm" class="response">
          <ul>
            <li v-for="(point, index) in responsePoints" :key="index">{{ point }}</li>
          </ul>
        </div>
        <div v-else class="response">
          <p>{{ response }}</p>
        </div>
      </div>
    </div>
  </template>




<script lang="ts">
    import { defineComponent, ref, computed, onMounted } from "vue";
    import axios from "axios";

    export default defineComponent({
    setup() {
        const prompt = ref("");
        const response = ref("");         
        const loading = ref(false);
        const documents = ref([]);

        const isPointForm = computed(() => {
        return response.value.trim().startsWith("1");
        });

        const responsePoints = computed(() => {
        return response.value
            .split("\n")
            .map((point) => point.trim())
            .filter((point, index) => !(index === 0 && (point === "" || point === "\n")));
        });

        const promptChatbot = async () => {
        loading.value = true;
        try {
            const res = await axios.get("http://127.0.0.1:5000/api/prompt", {
            params: { prompt: prompt.value },
            });
            console.log(res);
            response.value = res.data.message;
        } catch (error) {
            console.error("Error:", error);
            response.value = "Error getting response from chatbot";
        } finally {
            loading.value = false;
        }
        };

        const getDocuments = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:5000/api/getDocuments");
            documents.value = res.data.documents;
        } catch (error) {
            console.error("Error:", error);
            response.value = "Error getting documents";
        }
        };

        onMounted(() => {
        getDocuments();
        });

        return {
            prompt,
            response,
            loading,
            isPointForm,
            responsePoints,
            promptChatbot,
            documents,          
        };
    },
    });
</script>


<style scoped>

.prompt-chatbot {
  text-align: center;
}

.input-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 100%;
}

.input-field {
  padding: 0.5rem;
  font-size: 1rem;
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
}

.send-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  margin-left: 0.5rem;
}

.send-button:hover {
  background-color: #0056b3;
}

.response-container {
  width: 100%;
}

.response {
  text-align: left;
  font-size: 1rem;
}

</style>