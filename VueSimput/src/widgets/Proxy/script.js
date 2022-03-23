import SimputInput from '../../components/SimputItem';

export default {
  name: 'swProxy',
  props: {
    name: {
      type: String,
    },
    mtime: {
      type: Number,
    },
  },
  components: {
    SimputInput,
  },
  computed: {
    decorator() {
      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh
      return this.domains()[this.name]?.decorator?.available || { show: true, enable: true };
    },
    itemId() {
      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh
      return this.properties()[this.name];
    },
  },
  inject: ['data', 'properties', 'domains', 'dirty'],
};
