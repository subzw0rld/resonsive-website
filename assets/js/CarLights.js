import * as THREE from "three";
import { random, pickRandom } from './Util';

// export class CarLights {
//     constructor(webgl, options, color, speed) {
//         this.webgl = webgl;
//         this.options = options;
//         this.color = color;
//         this.speed = speed;
//     }

//     init() {
//         const options = this.options;
//         let curve = new THREE.LineCurve3(
//             new THREE.Vector3(0, 0, 0),
//             new THREE.Vector3(0, 0, -1)
//         );
//         let baseGeometry = new THREE.TubeBufferGeometry(curve, 25, 1, 8, false);
//         let instanced = new THREE.InstancedBufferGeometry().copy(baseGeometry);
//         instanced.maxInstancedCount = options.nPairs * 2;

//         let aOffset = [];
//         let aMetrics = [];

//         let sectionWidth = options.roadWidth / options.roadSections;

//         for (let i = 0; i < options.nPairs; i++) {
//             let radius = Math.random() * 0.1 + 0.1;
//             let length =
//                 Math.random() * options.length * 0.08 + options.length * 0.02;
//             let section = i % 3;

//             let sectionX =
//                 section * sectionWidth - options.roadWidth / 2 + sectionWidth / 2;
//             let carWidth = 0.5 * sectionWidth;
//             let offsetX = 0.5 * Math.random();

//             let offsetY = radius * 1.3;

//             let offsetZ = Math.random() * options.length;

//             aOffset.push(sectionX - carWidth / 2 + offsetX);
//             aOffset.push(offsetY);
//             aOffset.push(-offsetZ);

//             aOffset.push(sectionX + carWidth / 2 + offsetX);
//             aOffset.push(offsetY);
//             aOffset.push(-offsetZ);

//             aMetrics.push(radius);
//             aMetrics.push(length);

//             aMetrics.push(radius);
//             aMetrics.push(length);
//         }

//         instanced.addAttribute(
//             "aOffset",
//             new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false)
//         );

//         instanced.addAttribute(
//             "aMetrics",
//             new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false)
//         );

//         const material = new THREE.ShaderMaterial({
//             fragmentShader,
//             vertexShader,
//             side: THREE.DoubleSide,
//             uniforms: Object.assign(
//                 {
//                     uColor: new THREE.Uniform(new THREE.Color(this.color)),
//                     uTravelLength: new THREE.Uniform(options.length),
//                     uTime: new THREE.Uniform(0),
//                     uSpeed: new THREE.Uniform(this.speed)
//                 },
//                 this.webgl.fogUniforms,
//                 options.distortion.uniforms
//             )
//         });

//         material.onBeforeCompile = shader => {
//             shader.vertexShader = shader.vertexShader.replace(
//                 "#include <getDistortion_vertex>",
//                 options.distortion.getDistortion
//             );
//         };

//         let mesh = new THREE.Mesh(instanced, material);
//         mesh.frustumCulled = false;
//         this.mesh = mesh;

//         this.webgl.scene.add(mesh);
//     }

//     update(time) {
//         this.mesh.material.uniforms.uTime.value = time;
//     }
// }

// const fragmentShader = `
// uniform vec3 uColor;
//   void main() {
//       vec3 color = vec3(uColor);
//       gl_FragColor = vec4(color,1.);
//   }
// `;

// const vertexShader = `
// attribute vec3 aOffset;
// attribute vec2 aMetrics;
// uniform float uTime;
// uniform float uSpeed;
// uniform float uTravelLength;
// #include <getDistortion_vertex>
//   void main() {
//     vec3 transformed = position.xyz;

//     float radius = aMetrics.r;
//     float len = aMetrics.g;
//     transformed.xy *= radius; 
//     transformed.z *= len;

//     float zOffset = uTime * uSpeed + aOffset.z;
//     zOffset = len - mod(zOffset, uTravelLength);

//     // transformed.z +=uTime * uSpeed;


// 		// Keep them separated to make the next step easier!
// 	   transformed.z = transformed.z +zOffset ;
//         transformed.xy += aOffset.xy;


//     float progress = abs(transformed.z / uTravelLength);
//     transformed.xyz += getDistortion(progress);


//         vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
//         gl_Position = projectionMatrix * mvPosition;
// 	}
// `;

export class CarLights {
    constructor(webgl, options, colors, speed, fade) {
        this.webgl = webgl;
        this.options = options;
        this.colors = colors;
        this.speed = speed;
        this.fade = fade;
    }
    init() {
        const options = this.options;
        // Curve with length 1
        let curve = new THREE.LineCurve3(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, -1)
        );
        // Tube with radius = 1
        let geometry = new THREE.TubeBufferGeometry(curve, 40, 1, 8, false);

        let instanced = new THREE.InstancedBufferGeometry().copy(geometry);
        instanced.maxInstancedCount = options.lightPairsPerRoadWay * 2;

        let laneWidth = options.roadWidth / options.lanesPerRoad;

        let aOffset = [];
        let aMetrics = [];
        let aColor = [];

        let colors = this.colors;
        if (Array.isArray(colors)) {
            colors = colors.map(c => new THREE.Color(c));
        } else {
            colors = new THREE.Color(colors);
        }

        for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
            let radius = random(options.carLightsRadius);
            let length = random(options.carLightsLength);
            let speed = random(this.speed);

            let carLane = i % 3;
            let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2;

            let carWidth = random(options.carWidthPercentage) * laneWidth;
            // Drunk Driving
            let carShiftX = random(options.carShiftX) * laneWidth;
            // Both lights share same shiftX and lane;
            laneX += carShiftX;

            let offsetY = random(options.carFloorSeparation) + radius * 1.3;

            let offsetZ = -random(options.length);

            aOffset.push(laneX - carWidth / 2);
            aOffset.push(offsetY);
            aOffset.push(offsetZ);

            aOffset.push(laneX + carWidth / 2);
            aOffset.push(offsetY);
            aOffset.push(offsetZ);

            aMetrics.push(radius);
            aMetrics.push(length);
            aMetrics.push(speed);

            aMetrics.push(radius);
            aMetrics.push(length);
            aMetrics.push(speed);

            let color = pickRandom(colors);
            aColor.push(color.r);
            aColor.push(color.g);
            aColor.push(color.b);

            aColor.push(color.r);
            aColor.push(color.g);
            aColor.push(color.b);
        }
        instanced.addAttribute(
            "aOffset",
            new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false)
        );
        instanced.addAttribute(
            "aMetrics",
            new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false)
        );
        instanced.addAttribute(
            "aColor",
            new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false)
        );
        let material = new THREE.ShaderMaterial({
            fragmentShader: carLightsFragment,
            vertexShader: carLightsVertex,
            transparent: true,
            uniforms: Object.assign(
                {
                    // uColor: new THREE.Uniform(new THREE.Color(this.color)),
                    uTime: new THREE.Uniform(0),
                    uTravelLength: new THREE.Uniform(options.length),
                    uFade: new THREE.Uniform(this.fade)
                },
                this.webgl.fogUniforms,
                options.distortion.uniforms
            )
        });
        
        material.onBeforeCompile = shader => {
            shader.vertexShader = shader.vertexShader.replace(
                "#include <getDistortion_vertex>",
                options.distortion.getDistortion
            );
        };
        let mesh = new THREE.Mesh(instanced, material);
        mesh.frustumCulled = false;
        this.webgl.scene.add(mesh);
        this.mesh = mesh;
    }
    update(time) {
        this.mesh.material.uniforms.uTime.value = time;
    }
}

const carLightsFragment = `
    #define USE_FOG;
    ${THREE.ShaderChunk["fog_pars_fragment"]}
    varying vec3 vColor;
    varying vec2 vUv; 
    uniform vec2 uFade;
    void main() {
    vec3 color = vec3(vColor);
    float fadeStart = 0.4;
    float maxFade = 0.;
    float alpha = 1.;
    
    alpha = smoothstep(uFade.x, uFade.y, vUv.x);
    gl_FragColor = vec4(color,alpha);
    if (gl_FragColor.a < 0.0001) discard;
    ${THREE.ShaderChunk["fog_fragment"]}
    }
  `;

const carLightsVertex = `
    #define USE_FOG;
    ${THREE.ShaderChunk["fog_pars_vertex"]}
    attribute vec3 aOffset;
    attribute vec3 aMetrics;
    attribute vec3 aColor;
    
    uniform float uTravelLength;
    uniform float uTime;
    uniform float uSpeed;
    varying vec2 vUv; 
    varying vec3 vColor; 
    #include <getDistortion_vertex>
    void main() {
      vec3 transformed = position.xyz;
      float radius = aMetrics.r;
      float myLength = aMetrics.g;
      float speed = aMetrics.b;
      transformed.xy *= radius ;
      transformed.z *= myLength;
    
      // Add my length to make sure it loops after the lights hits the end
      transformed.z += myLength-mod( uTime *speed + aOffset.z, uTravelLength);
      transformed.xy += aOffset.xy;
      float progress = abs(transformed.z / uTravelLength);
      transformed.xyz += getDistortion(progress);
      vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
      gl_Position = projectionMatrix * mvPosition;
      vUv = uv;
      vColor = aColor;
      ${THREE.ShaderChunk["fog_vertex"]}
    }`;