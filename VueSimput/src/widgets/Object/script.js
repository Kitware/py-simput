import SimputInput from '../../components/SimputItem';

export default {
  name: 'swObject',
  props: {
    name: {
      type: String,
    },
  },
  components: {
    SimputInput,
  },
  computed: {
    itemId() {
      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh
      return this.properties()[this.name];
    },
  },
  inject: ['data', 'properties', 'constraints', 'dirty'],
};
