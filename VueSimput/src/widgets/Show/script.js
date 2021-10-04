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
      const { value, available } = this.constraints()?.[this.property]?.[this.constrain];
      if (value === 'local-in') {
        return available.indexOf(this.properties()?.[this.property]) !== -1;
      }
      return value;
    },
  },
  inject: ['properties', 'constraints'],
};
