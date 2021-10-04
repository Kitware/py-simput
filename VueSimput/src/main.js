import components from './components';
import widgets from './widgets';

export default {
  install(Vue) {
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name]);
    });
    Object.keys(widgets).forEach((name) => {
      Vue.component(name, widgets[name]);
    });
  },
};
