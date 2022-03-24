export default {
  name: 'swGroup',
  props: {
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    mtime: {
      type: Number,
    },
  },
  data() {
    return {
      mounted: false,
    };
  },
  mounted() {
    // We need to be monted to know about our visibility
    this.mounted = true;
  },
  computed: {
    decorator() {
      /* eslint-disable no-unused-expressions */
      this.mtime; // force refresh
      if (this.name) {
        return this.domains()[this.name]?.decorator?.available;
      }
      return null;
    },
    visible() {
      this.mtime; // eslint-disable-line
      this.mounted; // eslint-disable-line

      if (this.decorator && !this.decorator.show) {
        return false;
      }

      let visibleCount = 0;
      this.$slots.default.forEach((vNode) => {
        const { show } = vNode.componentInstance?.decorator || { show: false };
        if (show) {
          visibleCount++;
        }
      });
      return visibleCount > 0;
    },
  },
  inject: ['domains'],
};
