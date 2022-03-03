import { TYPES, FALLBACK_CONVERT } from '../../types';

// Layouts: horizontal, vertical, l2, l3, l4
export default {
  name: 'swSlider',
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
    // --- custom to current widget ---
    layout: {
      type: String,
    },
    sizeControl: {
      type: Boolean,
      default: false,
    },
    numberOfSteps: {
      type: Number,
      default: 255,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    step: {
      type: Number,
    },
  },
  data() {
    return {
      showHelp: false,
      dynamicSize: this.size,
    };
  },
  computed: {
    model: {
      get() {
        /* eslint-disable no-unused-expressions */
        this.mtime; // force refresh
        this.dynamicSize;
        return this.properties() && this.properties()[this.name];
      },
      set(v) {
        this.properties()[this.name] = v;
      },
    },
    decorator() {
      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh
      return this.domains()[this.name]?.decorator?.available || { show: true, enable: true };
    },
    computedLayout() {
      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh
      return this.layout || this.domains()[this.name]?.UI?.layout || 'vertical';
    },
    computedSize() {
      if (Number(this.size) !== 1) {
        return Math.max(this.size, this.model.length);
      }
      return Number(this.size);
    },
    computedSizeControl() {
      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh
      return this.sizeControl || this.domains()[this.name]?.UI?.sizeControl;
    },
    rule() {
      return TYPES[this.type]?.rule || true;
    },
    convert() {
      return TYPES[this.type]?.convert || FALLBACK_CONVERT;
    },
    computedMin() {
      if (this.min != null) {
        return this.min;
      }

      const dataRange = this.domains()?.[this.name]?.Range?.available;
      if (dataRange) {
        return dataRange[0];
      }
      return 0;
    },
    computedMax() {
      if (this.max != null) {
        return this.max;
      }

      const dataRange = this.domains()?.[this.name]?.Range?.available;
      if (dataRange) {
        return dataRange[1];
      }

      return 100;
    },
    computedStep() {
      if (this.type.indexOf('int') !== -1) {
        return 1;
      }
      const range = this.computedMax - this.computedMin;
      return range / this.numberOfSteps;
    },
    hints() {
      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh
      return this.domains()[this.name].hints || [];
    },
  },
  methods: {
    levelToType(level) {
      switch (level) {
        case 0:
          return 'info';
        case 1:
          return 'warning';
        case 2:
          return 'error';
        default:
          return 'success';
      }
    },
    levelToIcon(level) {
      switch (level) {
        case 0:
          return 'mdi-information-outline';
        case 1:
          return 'mdi-alert-octagon-outline';
        case 2:
          return 'mdi-alert-outline';
        default:
          return 'mdi-brain';
      }
    },
    addEntry() {
      this.dynamicSize = this.model.length + 1;
      this.model.length = this.dynamicSize;
      this.validate(this.dynamicSize);
    },
    deleteEntry(index) {
      this.model.splice(index, 1);
      this.dirty(this.name);
    },
    getComponentProps(index) {
      if (this.computedLayout === 'vertical') {
        return { cols: 12 };
      }
      if (this.computedLayout === 'l2') {
        return { cols: 6 };
      }
      if (this.computedLayout === 'l3') {
        return { cols: 4 };
      }
      if (this.computedLayout === 'l4') {
        return { cols: 3 };
      }
      if (this.computedLayout === 'm3-half') {
        const props = { cols: 4 };
        if (index === 3) {
          props.offset = 4;
        }
        if (index === 5) {
          props.offset = 8;
        }
        return props;
      }
      return {};
    },
    update(component = 0) {
      const value = component ? this.model[component - 1] : this.model;
      // must test against bool since it can be a string in case of error
      if (this.rule(value) === true) {
        if (Number(this.size) !== 1) {
          this.model[component - 1] = this.convert(value);
        } else {
          this.model = this.convert(value);
        }
        this.dirty(this.name);
      }
    },
    validate(component = 0) {
      const value = component ? this.model[component - 1] : this.model;
      if (Number(this.size) !== 1) {
        this.model[component - 1] = this.convert(value);
        if (this.model[component - 1] === null) {
          this.model[component - 1] = this.initial[component - 1];
        }
        this.model = this.model.slice();
      } else {
        this.model !== this.convert(value);
        this.model = this.convert(value);
        if (this.model === null) {
          this.model = this.initial;
        }
      }
      this.dirty(this.name);
    },
  },
  inject: ['data', 'properties', 'domains', 'dirty'],
};
