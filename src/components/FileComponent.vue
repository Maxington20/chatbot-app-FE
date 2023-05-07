<template>
  <div class="add-file" style="margin-bottom: 5rem;">
    <h2>Trained using the following files:</h2>
    <ul>
      <li v-for="(document, index) in documents" :key="index">{{ document }}</li>
    </ul>
  </div>
  
  <div class="add-file">
    <h2>Add a file on the fly</h2>
    <div class="input-container">
      <label for="user-name">User Name:</label>
      <input
        class="input-field"
        v-model="userName"
        id="user-name"
        placeholder="Enter your user name"
      />
    </div>
    <div class="input-container">
      <label for="document-name">Document Name:</label>
      <input
        class="input-field"
        v-model="documentName"
        id="document-name"
        placeholder="Enter the document name"
      />
    </div>
    <div class="input-container">
      <label for="document-content">Document Content:</label>
      <textarea
        class="input-field"
        v-model="documentContent"
        id="document-content"
        placeholder="Enter the document content"
        rows="10"
      ></textarea>
    </div>
    <button class="submit-button" @click="addFile" :disabled="fileLoading">
      {{ fileLoading ? "Loading..." : "Add File" }}
    </button>
    <p>{{ fileResponse }}</p>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {   
    const fileResponse = ref("");
    const fileLoading = ref(false);
    const userName = ref("");
    const documentName = ref("");
    const documentContent = ref("");    
    const documents = ref([]);

    const addFile = async () => {
        fileLoading.value = true;
        try {
            const res = await axios.get("http://127.0.0.1:5000/api/addFile", {
                params: { document_user: userName.value, document_name: documentName.value, document_content: documentContent.value},
                });
                fileResponse.value = res.data.message;
                getDocuments();                
            } catch (error) {
                console.error("Error:", error);
                fileResponse.value = "Error getting response from chatbot";
            } finally {
                fileLoading.value = false;
            }
    };

    const getDocuments = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/getDocuments");
        documents.value = res.data.documents;
      } catch (error) {
        console.error("Error:", error);
      }
    };

    onMounted(() => {
      getDocuments();
    });

    return {
        documents,
        addFile,
        userName,
        documentName,
        documentContent,
        fileResponse,
        fileLoading,
    };
  },
});

</script>

<style scoped>

.add-file {
  text-align: center;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
}

label {
  margin-bottom: 0.25rem;
}

.input-field {
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  max-width: 500px;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
}

textarea.input-field {
  resize: vertical;
}

.submit-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
}

.submit-button:hover {
  background-color: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.25rem 0;
}

</style>