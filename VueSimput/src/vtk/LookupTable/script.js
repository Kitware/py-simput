export default {
  name: 'swVtkLookupTable',
  props: {
    property: {
      type: String,
    },
    mtime: {
      type: Number,
    },
  },
  data() {
    return {
      colors: [],
      interpolation: 'HSV',

    };
  },
  inject: ['properties'],
};
