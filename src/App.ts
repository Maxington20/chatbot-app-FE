import { defineComponent, ref, computed, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const prompt = ref("");
    const response = ref("");
    const fileResponse = ref("");
    const fileLoading = ref(false);
    const userName = ref("");
    const documentName = ref("");
    const documentContent = ref("");    
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
      addFile,
        userName,
        documentName,
        documentContent,
        fileResponse,
        fileLoading,
    };
  },
});