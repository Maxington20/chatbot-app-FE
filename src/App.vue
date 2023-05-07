<template>
  <div id="app">
    <h1>Bids Vendor Chatbot</h1>
    <h2>Trained using the following documents:</h2>
    <ul>
      <li v-for="(document, index) in documents" :key="index">{{ document }}</li>
    </ul>
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
    <div class="add-file-section">
      <h2>Add a new file</h2>
      <div class="add-file-container">
        <div class="add-file-inputs">
          <input
            class="input-field"
            v-model="userName"
            placeholder="Enter user name"
          />
          <input
            class="input-field"
            v-model="documentName"
            placeholder="Enter document name"
          />
        </div>
        <textarea
          class="input-field textarea-field"
          v-model="documentContent"
          placeholder="Enter document content"
        ></textarea>
        <button class="send-button add-file-button" @click="addFile">
          {{ fileLoading ? "Loading..." : "Add file" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./App.ts"></script>
<style src="./App.css"></style>
```
