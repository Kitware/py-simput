export const MANAGERS = {};

export class DataManager {
  constructor(namespace, wsClient) {
    this.namespace = namespace;
    this.cache = null;
    this.comm = [];
    this.pending = {};
    this.wsClient = wsClient;
    this.resetCache();
    this.nextTS = 1;
    this.subscription = this.wsClient
      .getConnection()
      .getSession()
      .subscribe('simput.push', ([event]) => {
        const {
          id, data, constraints, type, ui,
        } = event;
        if (data) {
          console.log(`data(${id})`);
          delete this.pending[id];
          const before = JSON.stringify(this.cache.data[id]?.properties);
          const after = JSON.stringify(data.properties);
          if (before !== after) {
            this.cache.data[id] = data;
          }
          this.cache.data[id].mtime = data.mtime;
          this.cache.data[id].original = JSON.parse(after);
        }
        if (constraints) {
          console.log(`constraints(${id})`);
          const before = JSON.stringify(this.cache.constraints[id]);
          const after = JSON.stringify(constraints);
          // console.log(JSON.stringify(constraints, null, 2));
          if (before !== after) {
            this.cache.constraints[id] = constraints;
          }
        }
        if (ui) {
          console.log(`ui(${type})`);
          delete this.pending[type];
          this.cache.ui[type] = ui;
        }

        this.notify('change', { id, type });
        if (ui) {
          this.nextTS += 1;
          this.notify('templateTS');
        }
      });
    this.subscriptionUI = this.wsClient
      .getConnection()
      .getSession()
      .subscribe('simput.event', ([event]) => {
        if (event.topic === 'ui-change') {
          const typesToFetch = Object.keys(this.cache.ui);
          this.cache.ui = {};
          for (let i = 0; i < typesToFetch.length; i++) {
            this.getUI(typesToFetch[i]);
          }
        }
        if (event.topic === 'data-change') {
          const { ids, action } = event;
          for (let i = 0; i < ids.length; i++) {
            if (this.cache.data[ids[i]]) {
              if (action === 'change') {
                this.getData(ids[i], true);
              }
            }
          }
        }
      });

    this.onDirty = ({ id, name }) => {
      const value = this.cache.data[id].properties[name];
      this.wsClient
        .getRemote()
        .PyWebVue.trigger(`${this.namespace}Update`, [[{ id, name, value }]]);
    };
  }

  resetCache() {
    this.cache = {
      data: {},
      ui: {},
      constraints: {},
    };
  }

  connectBus(bus) {
    if (this.comm.indexOf(bus) === -1) {
      this.comm.push(bus);
      bus.$emit('connect');
      bus.$on('dirty', this.onDirty);
    }
  }

  disconnectBus(bus) {
    const index = this.comm.indexOf(bus);
    if (index > -1) {
      bus.$emit('disconnect');
      bus.$off('dirty', this.onDirty);
      this.comm.splice(index, 1);
    }
  }

  notify(topic, event) {
    for (let i = 0; i < this.comm.length; i++) {
      this.comm[i].$emit(topic, event);
    }
  }

  getData(id, forceFetch = false) {
    const data = this.cache.data[id];

    if ((!data || forceFetch) && !this.pending[id]) {
      this.pending[id] = true;
      this.wsClient.getRemote().PyWebVue.trigger(`${this.namespace}Fetch`, [], { id });
    }

    return data;
  }

  getConstraints(id, forceFetch = false) {
    const constraints = this.cache.constraints[id];

    if ((!constraints || forceFetch) && !this.pending[id]) {
      this.pending[id] = true;
      this.wsClient.getRemote().PyWebVue.trigger(`${this.namespace}Fetch`, [], { constraints: id });
    }

    return constraints;
  }

  getUI(type, forceFetch = false) {
    const ui = this.cache.ui[type];

    if ((!ui || forceFetch) && !this.pending[type]) {
      this.pending[type] = true;
      this.wsClient.getRemote().PyWebVue.trigger(`${this.namespace}Fetch`, [], { type });
    }

    return ui;
  }

  getUITimeStamp() {
    return this.nextTS;
  }

  refresh(id, name) {
    this.wsClient.getRemote().PyWebVue.trigger(`${this.namespace}Refresh`, [id, name]);
  }
}

export function getSimputManager(id, namespace, client) {
  if (!client) {
    return null;
  }

  if (MANAGERS[id]) {
    return MANAGERS[id];
  }

  const manager = new DataManager(namespace, client);
  MANAGERS[id] = manager;
  return manager;
}
