import { getSimputManager, debounce } from '../../utils';

export default {
  name: 'Simput',
  props: {
    wsClient: {
      type: Object,
    },
    namespace: {
      type: String,
      default: 'simput',
    },
    query: {
      type: String,
      default: '',
    },
  },
  created() {
    this.updateManager();
    this.pushQuery = debounce(
      () => this.$emit('query', this.query?.toLowerCase() || ''),
      250,
    );
  },
  beforeDestroy() {
    if (this.manager) {
      this.manager.disconnectBus(this);
    }
    this.manager = null;
  },
  watch: {
    namespace() {
      this.updateManager();
    },
    query() {
      this.pushQuery();
    },
  },
  methods: {
    updateManager() {
      if (!this.wsClient) {
        return;
      }

      if (this.manager) {
        this.manager.disconnectBus(this);
      }

      this.managerId = this.get(`${this.namespace}Id`);
      this.manager = getSimputManager(this.managerId, this.namespace, this.wsClient);
      this.manager.connectBus(this);
    },
    reload(name) {
      this.manager.notify('reload', name);
    },
  },
  provide() {
    return {
      simputChannel: this,
      getSimput: () => this.manager,
    };
  },
  inject: ['get'],
};
