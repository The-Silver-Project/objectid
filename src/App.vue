<template>
  <section class="app">
    <header>ObjectID Converter</header>

    <main>
      <section class="fields-wrap">
        <label>
          ObjectID
          <input
            type="text"
            v-model="objectId"
            @input="handleObjectIdInput"
            placeholder="ObjectID"
            spellcheck="false"
          >
        </label>

        <label>
          ISO Timestamp
          <input
            type="text"
            v-model="isoTimestamp"
            @input="handleIsoTimestampInput"
            placeholder="ISO Timestamp"
            spellcheck="false"
          >
        </label>
      </section>
    </main>
  </section>
</template>

<script>
const minDate = new Date(0);
const maxDate = new Date(0xffffffff * 1000);

export default {
  name: 'App',

  data: () => ({
    objectId: '',
    isoTimestamp: '',
  }),

  methods: {
    getDateFromObjectId(objectId) {
      return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    },

    getIsoDateStringFromObjectId(objectId) {
      if (!objectId) return '';
      return this.getDateFromObjectId(objectId).toISOString();
    },

    getObjectIdFromDate(date) {
      const time = date.getTime();
      if (Number.isNaN(time) || date < minDate || date > maxDate) return '';
      const timeStr = Math.floor(time / 1000).toString(16);
      return `${'0'.repeat(8 - timeStr.length) + timeStr}0000000000000000`;
    },

    handleObjectIdInput(event) {
      const objectId = event.target.value;
      this.isoTimestamp = this.getIsoDateStringFromObjectId(objectId);
    },

    handleIsoTimestampInput(event) {
      const isoTimestamp = event.target.value;
      const date = new Date(isoTimestamp);
      this.objectId = this.getObjectIdFromDate(date);
    },
  },
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 24px;
}

header {
  text-align: center;
  margin-top: 36px;
  text-transform: uppercase;
  color: #171511;
}

main {
  flex-grow: 1;
  display: flex;
}

.fields-wrap {
  margin: auto;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 24px;
  color: #63614f;
  font-size: 12px;
  text-transform: uppercase;
}

input {
  display: block;
  border: 0;
  outline: 0;
  background-color: inherit;
  font: inherit;
  color: #b9b39e;
  font-weight: 900;
  font-size: 24px;
  width: 100%;
}
input::placeholder {
  color: #b9b39e79;
}

@media all and (min-width: 400px) {
  .fields-wrap {
    width: auto;
  }

  input {
    width: 350px;
  }
}

@media all and (min-width: 600px) {
  input {
    font-size: 36px;
  }
}

@media all and (min-width: 800px) {
  input {
    font-size: 48px;
    width: 700px;
  }
}

@media all and (min-width: 1100px) {
  input {
    font-size: 64px;
    width: 1000px;
  }
}
</style>
