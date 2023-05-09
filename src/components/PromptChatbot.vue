<template>
  <div class="app-container">
    <header class="app-header">
      <h2>Chat</h2>
    </header>
    <div class="content-container">
      <div class="prompt-chatbot">
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
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

h2 {
  margin: 0;
}

.app-header {
  padding: 0;
  background-color: #007bff;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 15px;
  border-color: #007bff;
  border: 1px solid #007bff;
}

.tabs-container {
  display: flex;
  justify-content: center;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  padding: 0.5rem;
}

.tabs-container button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: #333;
  padding: 0.5rem 1rem;
  outline: none;
}

.tabs-container button:hover {
  color: #007bff;
}

.tabs-container button.active {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

.content-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem 0 0;
}

.prompt-chatbot {
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.input-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  width: 100%;
}

.input-field {
  padding: 0.75rem;
  font-size: 1.5rem;
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 15px;
  outline: none;
}

.send-button {
  padding: 0.5rem 2rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: 1px;
  border-radius: 15px;
  cursor: pointer;
  outline: none;
  margin-left: 0.5rem;
}

.send-button:hover {
  background-color: #0056b3;
}

.response-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.response {
  text-align: left;
  font-size: 1.5rem;
  background-color: #f0f0f0;
  border-radius: 15px;
  padding: 12px 20px;
  margin-bottom: 8px;
  word-wrap: break-word;
}

.response p {
  margin: 0;
}

.response ul {
  margin: 0;
  padding-left: 20px;
}
</style>