export default {
  name: 'swVtkColor',
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
    color() {
      const vtkColor = this.model;
      return {
        r: Math.round(vtkColor[0] * 255),
        g: Math.round(vtkColor[1] * 255),
        b: Math.round(vtkColor[2] * 255),
        a: Math.round(vtkColor[3] ?? 1),
      };
    },
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
  },
  methods: {
    validate({ rgba }) {
      const vtkColor = [rgba.r / 255, rgba.g / 255, rgba.b / 255];
      if (this.size === 4) {
        vtkColor[3] = rgba.a;
      }
      this.model = vtkColor;
      this.dirty(this.name);
    },
  },
  inject: ['data', 'properties', 'domains', 'dirty', 'uiTS', 'simputChannel'],
};
