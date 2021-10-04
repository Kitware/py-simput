import { getSimputManager } from '../../utils';

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
  },
  created() {
    this.updateManager();
  },
  beforeUnmount() {
    if (this.manager) {
      this.manager.disconnectBus(this);
    }
    this.manager = null;
  },
  watch: {
    namespace() {
      this.updateManager();
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
  },
  provide() {
    return {
      simputChannel: this,
      getSimput: () => this.manager,
    };
  },
  inject: ['get'],
};
