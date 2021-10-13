import { TYPES, FALLBACK_CONVERT } from '../../types';

export default {
  name: 'swSwitch',
  props: {
    name: {
      type: String,
    },
    size: {
      type: Number,
      default: 1,
    },
    label: {
      type: String,
    },
    help: {
      type: String,
    },
    mtime: {
      type: Number,
    },
    type: {
      type: String,
    },
    initial: {},
  },
  data() {
    return {
      showHelp: false,
    };
  },
  computed: {
    model: {
      get() {
        /* eslint-disable no-unused-expressions */
        this.mtime; // force refresh
        return this.properties() && this.properties()[this.name];
      },
      set(v) {
        this.properties()[this.name] = v;
      },
    },
    convert() {
      return TYPES[this.type]?.convert || FALLBACK_CONVERT;
    },
  },
  methods: {
    validate() {
      this.model = this.convert(this.model);
      this.dirty(this.name);
    },
  },
  inject: ['data', 'properties', 'domains', 'dirty'],
};
