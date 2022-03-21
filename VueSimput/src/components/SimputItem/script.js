import VRuntimeTemplate from 'v-runtime-template';

export default {
  name: 'SimputItem',
  props: {
    itemId: {
      type: String,
    },
    noUi: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    VRuntimeTemplate,
  },
  data() {
    return {
      data: null,
      ui: null,
      domains: null,
    };
  },
  created() {
    this.onConnect = () => {
      this.update();
    };
    this.onChange = ({ id, type }) => {
      /* eslint-disable eqeqeq */
      if (id && this.itemId == id) {
        this.data = this.getSimput().getData(id);
        this.domains = this.getSimput().getDomains(id);
      }
      if (type && this.type === type) {
        this.ui = this.getSimput().getUI(this.type);
      }
      if (!type && this.type && !this.ui) {
        this.ui = this.getSimput().getUI(this.type);
      }
    };
    this.onReload = (name) => {
      if (name === 'data') {
        this.data = this.getSimput().getData(this.itemId, true);
      }
      if (name === 'ui') {
        this.ui = this.getSimput().getUI(this.itemId, true);
      }
      if (name === 'domain') {
        this.domains = this.getSimput().getDomains(this.itemId, true);
      }
    };
    this.simputChannel.$on('connect', this.onConnect);
    this.simputChannel.$on('change', this.onChange);
    this.simputChannel.$on('reload', this.onReload);
    this.update();
  },
  beforeUnmount() {
    this.simputChannel.$off('connect', this.onConnect);
    this.simputChannel.$off('change', this.onChange);
    this.simputChannel.$off('reload', this.onReload);
  },
  watch: {
    itemId() {
      this.update();
    },
  },
  computed: {
    type() {
      return this.data && this.data.type;
    },
    available() {
      return !!(this.data && this.domains && this.ui);
    },
    properties() {
      return this.data?.properties;
    },
    all() {
      const { data, domains, properties } = this;
      return {
        id: this.itemId, data, domains, properties,
      };
    },
  },
  methods: {
    update() {
      this.data = null;
      this.ui = null;
      if (this.itemId) {
        this.data = this.getSimput().getData(this.itemId);
        this.domains = this.getSimput().getDomains(this.itemId);
        if (this.type) {
          this.ui = this.getSimput().getUI(this.type);
        }
      }
    },
    dirty(name) {
      this.simputChannel.$emit('dirty', { id: this.data.id, name });
    },
  },
  inject: ['simputChannel', 'getSimput'],
  provide() {
    return {
      simputChannel: this.simputChannel,
      dirty: (name) => this.dirty(name),
      data: () => this.data,
      domains: () => this.domains,
      properties: () => this.properties,
      uiTS: () => this.getSimput().getUITimeStamp(),
    };
  },
};
