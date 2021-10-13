export default {
  name: 'swShow',
  props: {
    property: {
      type: String,
    },
    constrain: {
      type: String,
    },
    mtime: {
      type: Number,
    },
  },
  computed: {
    visible() {
      this.mtime; // eslint-disable-line
      const constraint = this.constraints()?.[this.property]?.[this.constrain];
      if (!constraint) {
        // no constraint == valid
        return true;
      }
      return constraint.value;
    },
  },
  inject: ['properties', 'constraints'],
};
