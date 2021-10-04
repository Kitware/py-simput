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
    computedLayout() {
      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh
      return this.layout || this.constraints()[this.name]?.UI?.layout || 'vertical';
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
      return this.sizeControl || this.constraints()[this.name]?.UI?.sizeControl;
    },
    rule() {
      return TYPES[this.type]?.rule || true;
    },
    convert() {
      return TYPES[this.type]?.convert || FALLBACK_CONVERT;
    },
    computedMin() {
      /* eslint-disable no-unused-expressions */
      if (this.min != null) {
        return this.min;
      }
      const { property, constraint } = this.constraints()?.[this.name]?.Range?.available || {};
      const selectedArray = this.properties()?.[property];
      const arrays = this.constraints()?.[property]?.[constraint]?.available || [];
      for (let i = 0; i < arrays.length; i++) {
        const array = arrays[i];
        if (array.value === selectedArray) {
          console.log('Found array range', array.range);
          return array.range[0];
        }
      }

      console.log('range failed', this.constraints()[this.name]);
      // TODO - FIXME use dynamic constraints
      return 0;
    },
    computedMax() {
      /* eslint-disable no-unused-expressions */
      if (this.max != null) {
        return this.max;
      }

      const { property, constraint } = this.constraints()?.[this.name]?.Range?.available || {};
      const selectedArray = this.properties()?.[property];
      const arrays = this.constraints()?.[property]?.[constraint]?.available || [];
      for (let i = 0; i < arrays.length; i++) {
        const array = arrays[i];
        if (array.value === selectedArray) {
          console.log('Found array range', array.range);
          return array.range[1];
        }
      }

      // TODO - FIXME use dynamic constraints
      return 100;
    },
    computedStep() {
      if (this.type.indexOf('int') !== -1) {
        return 1;
      }
      const range = this.computedMax - this.computedMin;
      return range / this.numberOfSteps;
    },
  },
  methods: {
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
      // console.log('update', component, this.size);
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
  inject: ['data', 'properties', 'constraints', 'dirty'],
};
