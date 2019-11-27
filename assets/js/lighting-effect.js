import * as THREE from "three";
import { App } from "./App";
import { deepUniforms, deepDistortion } from './Distortions';

// const distortion_uniforms = {
//   uDistortionX: new THREE.Uniform(new THREE.Vector2(80, 3)),
//   uDistortionY: new THREE.Uniform(new THREE.Vector2(-40, 2.5))
// };

// const distortion_vertex = `
// #define PI 3.14159265358979
//   uniform vec2 uDistortionX;
//   uniform vec2 uDistortionY;

//     float nsin(float val){
//     return sin(val) * 0.5+0.5;
//     }
//   vec3 getDistortion(float progress){
//         progress = clamp(progress, 0.,1.);
//         float xAmp = uDistortionX.r;
//         float xFreq = uDistortionX.g;
//         float yAmp = uDistortionY.r;
//         float yFreq = uDistortionY.g;
//         return vec3( 
//             xAmp * nsin(progress* PI * xFreq   - PI / 2. ) ,
//             yAmp * nsin(progress * PI *yFreq - PI / 2.  ) ,
//             0.
//         );
//     }
// `;

// const myCustomDistortion = {
//   uniforms: distortion_uniforms,
//   getDistortion: distortion_vertex
// };

// const options = {
//   length: 1200,
//   width: 20,
//   roadWidth: 9,
//   islandWidth: 2,
//   nPairs: 50,
//   roadSections: 3,
//   lightStickWidth: [0.12, 0.5],
//   lightStickHeight: [1.3, 1.7],
//   sticks: 0xDCE0EE,
//   distortion: myCustomDistortion
// };

// const container = document.getElementById("lightingEffect");
// const myApp = new App(container, options);
// myApp.loadAssets().then(myApp.init);

// if (module && module.hot) {
//   module.hot.dispose(() => {
//     if (myApp) myApp.dispose();
//   });
// }

const container = document.getElementById('lightingEffect');
const options = {
    onSpeedUp: (ev) => {
    },
    onSlowDown: (ev) => {
    },
    // mountainDistortion || LongRaceDistortion || xyDistortion || turbulentDistortion || turbulentDistortionStill || deepDistortionStill || deepDistortion
    distortion: deepDistortion,

    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    // Percentage of the lane's width
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    /*** These ones have to be arrays of [min,max].  ***/
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    /****  Anything below can be either a number or an array of [min,max] ****/
    // Length of the lights. Best to be less than total length
    carLightsLength: [400 * 0.05, 400 * 0.15],
    // Radius of the tubes
    carLightsRadius: [0.05, 0.1],
    // Width is percentage of a lane. Numbers from 0 to 1
    carWidthPercentage: [0.3, 0.5],
    // How drunk the driver is.
    // carWidthPercentage's max + carShiftX's max -> Cannot go over 1. 
    // Or cars start going into other lanes 
    carShiftX: [-0.2, 0.5],
    // Self Explanatory
    carFloorSeparation: [0.05, 1],
    colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x424242,
        shoulderLines: 0x131318,
        brokenLines: 0x131318,
        /***  Only these colors can be an array ***/
        leftCars: [0xE2173C, 0x841010, 0xF23D3D],
        rightCars: [0xffffff, 0x7686BF, 0x1338B5],
        sticks: 0xDCE0EE,
    }
};

const myApp = new App(container, options);
myApp.loadAssets().then(myApp.init)
