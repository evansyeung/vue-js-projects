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
      deleteResource: this.deleteResource,
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
    deleteResource(resourceId) {
      // THIS DOES NOT WORK BECAUSE OF HOW PROVIDE/INJECT WORKS
      // Vue execute the provide method in the end when it creates this component
      // So it then injects this storedResources array in all the components that need it
      // The thing is storedResources is an array and thus a value stored in memory (reference value)
      // When we push() or unshift(), we're changing the same array in memory and Vue is able to recognize the change
      // However, this approach overwrites the array and Vue does not detect the change
      // this.storedResources = this.storedResources.filter(
      //   (resource) => resource.id !== resourceId
      // );

      const resourceIndex = this.storedResources.findIndex(
        (resource) => resource.id === resourceId
      );
      // Manipulates the original array
      this.storedResources.splice(resourceIndex, 1);
    },
  },
};
</script>
