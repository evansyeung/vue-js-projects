<template>
  <base-card>
    <!-- When you add props or event listners on custom component then by default
    they fallthroughto the root level element in the custom component template -->
    <base-button
      @click="setSelectedTab('stored-resources')"
      :mode="storedResourceButtonMode"
    >
      Stored Resources
    </base-button>
    <base-button
      @click="setSelectedTab('add-resource')"
      :mode="addResourceButtonMode"
    >
      Add Resources
    </base-button>
    <keep-alive>
      <component :is="selectedTab"> </component>
    </keep-alive>
  </base-card>
</template>

<script>
import AddResource from "./AddResource.vue";
import StoredResources from "./StoredResources.vue";

export default {
  components: {
    AddResource,
    StoredResources,
  },
  data() {
    return {
      selectedTab: "stored-resources",
      storedResources: [
        {
          id: "official-guide",
          title: "Official Guide",
          description: "The official Vue.js documentation.",
          link: "https://vuejs.org",
        },
        {
          id: "google",
          title: "Google",
          description: "Learning to google...",
          link: "https://google.com",
        },
      ],
    };
  },
  // We want to provide/inject resources to StoredResources component
  provide() {
    return {
      resources: this.storedResources,
      // We can also provide the addResource function instead of listening to emit
      addResource: this.addResource,
    };
  },
  computed: {
    storedResourceButtonMode() {
      return this.selectedTab === "stored-resources" ? null : "flat";
    },
    addResourceButtonMode() {
      return this.selectedTab === "add-resource" ? null : "flat";
    },
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
    addResource(resourceObj) {
      this.storedResources.unshift(resourceObj);
      this.setSelectedTab("stored-resources");
    },
  },
};
</script>
