<template>
  <div id="app">
    <h1>Bids Vendor Chatbot</h1>
    <div class="tabs">
      <button class="tab-button" :class="{ active: activeTab === 'prompt' }" @click="activeTab = 'prompt'">Prompt Chatbot</button>
      <button class="tab-button" :class="{ active: activeTab === 'addFile' }" @click="activeTab = 'addFile'">Files</button>
    </div>
    <div v-show="activeTab === 'prompt'">
      <PromptChatbot />
    </div>
    <div v-show="activeTab === 'addFile'">
      <File />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PromptChatbot from "./components/PromptChatbot.vue";
import File from "./components/FileComponent.vue";

export default defineComponent({
  components: {
    PromptChatbot,
    File,
  },
  setup() {
    const activeTab = ref("prompt");

    return {
      activeTab,
    };
  },
});
</script>

<style>
body {
  font-family: Arial, sans-serif;
}

#app {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}

.tab-button {
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-bottom: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-right: 2px;
}

.tab-button:last-child {
  margin-right: 0;
}

.tab-button:hover {
  background-color: #ddd;
}

.tab-button.active {
  background-color: #fff;
  font-weight: bold;
}

</style>