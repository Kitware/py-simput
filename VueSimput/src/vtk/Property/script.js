export default {
  name: 'swVtkProperty',
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
      // Colors
      color: [1, 1, 1],
      ambientColor: [1, 1, 1],
      diffuseColor: [1, 1, 1],
      specularColor: [1, 1, 1],
      edgeColor: [0, 0, 0],
      vertexColor: [0, 0, 0],
      selectionColor: [1, 0, 0, 1],
      edgeTint: [1, 1, 1], // <= PBR ?

      // light handling
      ambient: 1,
      diffuse: 1,
      specular: 1,
      specularPower: 1,

      // core
      opacity: 1,
      pointSize: 1,
      lineWidth: 1,
      selectionPointSize: 2,
      selectionLineWidth: 2,
      interpolation: 1, // flat, gouraud, phong, pbr
      representation: 2, // point: 0, wireframe: 1, surface: 2

      // flags
      edgeVisibility: false,
      vertexVisibility: false,
      backfaceCulling: true,
      frontfaceCulling: false,
      lighting: true,
      renderPointsAsSphere: false,
      renderLinesAsTubes: false,
      showTexturesOnBackface: false,
      shading: true,
      materialName: '',

      // line
      lineStipplePattern: 1,
      lineStippleRepeatFactor: 1,

      // PBR
      metallic: 1,
      roughtness: 1,
      anisotropy: 1,
      anisotropyRotation: 0,
      baseIOR: 0,
      // coat
      coatColor: [1, 1, 1],
      coatIOR: 0,
      coatRoughness: 0,
      coatStrength: 0,
      coatNormalScale: 0,

      // ???
      occlusionStrength: 0,
      //
      normalScale: 1,
      emissiveFactor: [1, 1, 1],
    };
  },
  inject: ['properties'],
};
