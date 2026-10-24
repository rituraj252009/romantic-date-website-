import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeRomanticCanvasProps {
  sceneState: 'intro' | 'shayari' | 'letter' | 'proposal' | 'celebration' | 'planner';
  isCelebrationActive?: boolean;
}

export const ThreeRomanticCanvas: React.FC<ThreeRomanticCanvasProps> = ({
  sceneState,
  isCelebrationActive = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const celebrationRef = useRef(isCelebrationActive);
  const sceneStateRef = useRef(sceneState);

  celebrationRef.current = isCelebrationActive;
  sceneStateRef.current = sceneState;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0316, 0.032);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x38123d, 1.4);
    scene.add(ambientLight);

    // Moonlit directional light
    const moonLight = new THREE.DirectionalLight(0xcde1ff, 1.8);
    moonLight.position.set(5, 12, 7);
    scene.add(moonLight);

    // Warm Romantic Rose Point Light
    const rosePointLight = new THREE.PointLight(0xff2255, 3.8, 18);
    rosePointLight.position.set(0, 1, 3);
    scene.add(rosePointLight);

    // Golden Fairy Point Light
    const goldPointLight = new THREE.PointLight(0xffb833, 2.5, 15);
    goldPointLight.position.set(-3, -2, 4);
    scene.add(goldPointLight);

    // Violet Rim Light
    const violetLight = new THREE.PointLight(0xa855f7, 2.8, 20);
    violetLight.position.set(4, -3, -2);
    scene.add(violetLight);

    // 3. Central 3D Glowing Heart
    const heartShape = new THREE.Shape();
    // Heart parametric curve
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.35, y, x - 0.35, y + 0.35, x - 0.35, y + 0.35);
    heartShape.bezierCurveTo(x - 0.35, y + 0.55, x - 0.15, y + 0.77, x + 0.25, y + 1.0);
    heartShape.bezierCurveTo(x + 0.65, y + 0.77, x + 0.85, y + 0.55, x + 0.85, y + 0.35);
    heartShape.bezierCurveTo(x + 0.85, y + 0.35, x + 0.85, y, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.12,
      bevelThickness: 0.12
    };

    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeometry.center();

    const heartMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff1e53,
      emissive: 0x5a0218,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.1,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);
    heartMesh.scale.set(1.4, -1.4, 1.4); // Invert Y because shape is upside down
    heartMesh.position.set(0, 0.4, 0);
    scene.add(heartMesh);

    // 4. Procedural Realistic Red Rose
    const roseGroup = new THREE.Group();

    // Create layered blooming petals
    const petalMaterial = new THREE.MeshStandardMaterial({
      color: 0xba0c2f,
      roughness: 0.38,
      metalness: 0.05,
      side: THREE.DoubleSide,
      emissive: 0x40020d,
      emissiveIntensity: 0.4,
    });

    const innerPetalMaterial = new THREE.MeshStandardMaterial({
      color: 0xd91438,
      roughness: 0.32,
      metalness: 0.08,
      side: THREE.DoubleSide,
      emissive: 0x660517,
      emissiveIntensity: 0.6,
    });

    // Petal geometry using curved sphere slice
    const numLayers = 5;
    const petalsPerLayer = [3, 4, 5, 6, 7];
    const layerRadii = [0.25, 0.45, 0.65, 0.88, 1.1];
    const layerHeights = [0.1, 0.0, -0.15, -0.3, -0.45];
    const layerRotations = [0.2, 0.4, 0.65, 0.9, 1.15];

    for (let l = 0; l < numLayers; l++) {
      const count = petalsPerLayer[l];
      const r = layerRadii[l];
      const h = layerHeights[l];
      const rot = layerRotations[l];
      const mat = l < 2 ? innerPetalMaterial : petalMaterial;

      for (let p = 0; p < count; p++) {
        const angle = (p / count) * Math.PI * 2 + (l * 0.5);
        const petalGeo = new THREE.SphereGeometry(r * 0.7, 16, 12, 0, Math.PI * 0.85, 0, Math.PI * 0.65);
        const petal = new THREE.Mesh(petalGeo, mat);
        
        petal.position.set(
          Math.cos(angle) * r * 0.4,
          h,
          Math.sin(angle) * r * 0.4
        );
        petal.rotation.y = angle + Math.PI / 2;
        petal.rotation.x = rot;
        petal.scale.set(1, 1.2, 0.4);
        roseGroup.add(petal);
      }
    }

    // Calyx & Stem
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x1f5c22,
      roughness: 0.5,
      metalness: 0.05,
    });

    const stemGeo = new THREE.CylinderGeometry(0.06, 0.05, 2.5, 12);
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.set(0, -1.8, 0);
    stem.rotation.z = 0.08;
    roseGroup.add(stem);

    // Leaves
    const leafGeo = new THREE.SphereGeometry(0.35, 12, 8, 0, Math.PI, 0, Math.PI * 0.5);
    const leaf1 = new THREE.Mesh(leafGeo, stemMat);
    leaf1.scale.set(0.6, 1.4, 0.1);
    leaf1.position.set(0.2, -1.4, 0.1);
    leaf1.rotation.z = -0.7;
    leaf1.rotation.y = 0.3;
    roseGroup.add(leaf1);

    const leaf2 = new THREE.Mesh(leafGeo, stemMat);
    leaf2.scale.set(0.5, 1.3, 0.1);
    leaf2.position.set(-0.2, -1.8, -0.05);
    leaf2.rotation.z = 0.8;
    leaf2.rotation.y = -0.4;
    roseGroup.add(leaf2);

    roseGroup.position.set(0, -0.4, 0.6);
    roseGroup.scale.set(0.85, 0.85, 0.85);
    scene.add(roseGroup);

    // 5. Orbiting Mini Hearts
    const orbitGroup = new THREE.Group();
    const miniHeartGeometry = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.04,
      bevelThickness: 0.04
    });
    miniHeartGeometry.center();

    const miniHeartMat = new THREE.MeshStandardMaterial({
      color: 0xff3b6f,
      emissive: 0x99002b,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.1
    });

    const numOrbiters = 5;
    const orbiters: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; yOffset: number }[] = [];

    for (let i = 0; i < numOrbiters; i++) {
      const mesh = new THREE.Mesh(miniHeartGeometry, miniHeartMat);
      mesh.scale.set(0.28, -0.28, 0.28);
      const angle = (i / numOrbiters) * Math.PI * 2;
      const radius = 2.0 + (i % 2) * 0.5;
      const yOffset = (i - 2) * 0.4;
      mesh.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
      orbitGroup.add(mesh);
      orbiters.push({ mesh, angle, speed: 0.8 + i * 0.2, radius, yOffset });
    }
    scene.add(orbitGroup);

    // 6. Falling 3D Rose Petals
    const numFallingPetals = 75;
    const fallingPetals: {
      mesh: THREE.Mesh;
      vx: number;
      vy: number;
      vz: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
    }[] = [];

    const fallingPetalMat = new THREE.MeshStandardMaterial({
      color: 0xdf1642,
      emissive: 0x4a0312,
      emissiveIntensity: 0.3,
      side: THREE.DoubleSide,
      roughness: 0.4,
    });

    const petalTemplateGeo = new THREE.SphereGeometry(0.2, 10, 8, 0, Math.PI * 0.75, 0, Math.PI * 0.6);

    for (let i = 0; i < numFallingPetals; i++) {
      const pMesh = new THREE.Mesh(petalTemplateGeo, fallingPetalMat);
      pMesh.position.set(
        (Math.random() - 0.5) * 18,
        Math.random() * 16 - 8,
        (Math.random() - 0.5) * 12
      );
      pMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = 0.5 + Math.random() * 0.7;
      pMesh.scale.set(scale, scale * 1.2, scale * 0.35);

      scene.add(pMesh);
      fallingPetals.push({
        mesh: pMesh,
        vx: (Math.random() - 0.5) * 0.015,
        vy: -0.012 - Math.random() * 0.02,
        vz: (Math.random() - 0.5) * 0.01,
        rotSpeedX: 0.01 + Math.random() * 0.02,
        rotSpeedY: 0.015 + Math.random() * 0.025,
        rotSpeedZ: 0.008 + Math.random() * 0.015,
      });
    }

    // 7. Warm Fairy Lights & Golden Bokeh Particles
    const bokehCount = 120;
    const bokehGeo = new THREE.BufferGeometry();
    const bokehPositions = new Float32Array(bokehCount * 3);
    const bokehScales = new Float32Array(bokehCount);

    for (let i = 0; i < bokehCount; i++) {
      bokehPositions[i * 3] = (Math.random() - 0.5) * 22;
      bokehPositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      bokehPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      bokehScales[i] = 0.8 + Math.random() * 1.5;
    }

    bokehGeo.setAttribute('position', new THREE.BufferAttribute(bokehPositions, 3));

    // Particle texture
    const canvasBokeh = document.createElement('canvas');
    canvasBokeh.width = 64;
    canvasBokeh.height = 64;
    const ctxB = canvasBokeh.getContext('2d')!;
    const grad = ctxB.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 220, 140, 1)');
    grad.addColorStop(0.3, 'rgba(255, 120, 160, 0.7)');
    grad.addColorStop(0.7, 'rgba(230, 40, 100, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctxB.fillStyle = grad;
    ctxB.fillRect(0, 0, 64, 64);
    const bokehTexture = new THREE.CanvasTexture(canvasBokeh);

    const bokehMat = new THREE.PointsMaterial({
      size: 0.45,
      map: bokehTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const bokehPoints = new THREE.Points(bokehGeo, bokehMat);
    scene.add(bokehPoints);

    // 8. Parallax and Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) / windowHalfX;
      mouseY = (e.clientY - windowHalfY) / windowHalfY;
      targetCameraX = mouseX * 1.2;
      targetCameraY = -mouseY * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Camera parallax interpolation
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;

      // Dynamic Camera Position based on Scene
      let targetZ = 10;
      let targetY = 0;
      if (sceneStateRef.current === 'proposal') {
        targetZ = 7.5;
        targetY = 0.2;
      } else if (celebrationRef.current || sceneStateRef.current === 'celebration') {
        targetZ = 6.2;
        targetY = 0.5;
      } else if (sceneStateRef.current === 'letter') {
        targetZ = 9.2;
      }

      camera.position.z += (targetZ - camera.position.z) * 0.04;
      camera.lookAt(0, targetY, 0);

      // Heartbeat & floating animation
      const beatFreq = celebrationRef.current ? 5.5 : 2.5;
      const beatScale = 1 + Math.sin(elapsedTime * beatFreq) * 0.06 + Math.sin(elapsedTime * beatFreq * 2) * 0.03;
      
      const celebrationMultiplier = celebrationRef.current ? 1.6 : 1.0;
      heartMesh.scale.set(
        1.4 * beatScale * celebrationMultiplier,
        -1.4 * beatScale * celebrationMultiplier,
        1.4 * beatScale * celebrationMultiplier
      );
      heartMesh.rotation.y = Math.sin(elapsedTime * 0.8) * 0.25;
      heartMesh.position.y = 0.4 + Math.sin(elapsedTime * 1.2) * 0.12;

      // Glow intensity on heart in celebration
      if (celebrationRef.current) {
        heartMaterial.emissiveIntensity = 1.0 + Math.sin(elapsedTime * 8) * 0.5;
        rosePointLight.intensity = 5.5;
      } else {
        heartMaterial.emissiveIntensity = 0.5 + Math.sin(elapsedTime * 2) * 0.2;
        rosePointLight.intensity = 3.8;
      }

      // Rose rotation and gentle breathing sway
      roseGroup.rotation.y = elapsedTime * 0.22;
      roseGroup.rotation.z = Math.sin(elapsedTime * 0.9) * 0.06;
      roseGroup.position.y = -0.4 + Math.sin(elapsedTime * 1.1) * 0.08;

      // Orbiting Mini Hearts
      orbiters.forEach((orb) => {
        orb.angle += delta * orb.speed;
        orb.mesh.position.x = Math.cos(orb.angle) * orb.radius;
        orb.mesh.position.z = Math.sin(orb.angle) * orb.radius;
        orb.mesh.position.y = orb.yOffset + Math.sin(elapsedTime * 2 + orb.angle) * 0.25;
        orb.mesh.rotation.y = orb.angle + Math.PI / 2;
        orb.mesh.rotation.z = Math.sin(elapsedTime * 3) * 0.2;
      });

      // Falling Petals Physics
      fallingPetals.forEach((p) => {
        p.mesh.position.x += p.vx + Math.sin(elapsedTime + p.mesh.position.y) * 0.008;
        p.mesh.position.y += p.vy;
        p.mesh.position.z += p.vz;

        p.mesh.rotation.x += p.rotSpeedX;
        p.mesh.rotation.y += p.rotSpeedY;
        p.mesh.rotation.z += p.rotSpeedZ;

        // Reset if petal falls below floor
        if (p.mesh.position.y < -7) {
          p.mesh.position.y = 8 + Math.random() * 2;
          p.mesh.position.x = (Math.random() - 0.5) * 18;
          p.mesh.position.z = (Math.random() - 0.5) * 12;
        }
      });

      // Bokeh particles slow drift
      const positions = bokehGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < bokehCount; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime * 0.5 + i) * 0.003;
      }
      bokehGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      heartGeometry.dispose();
      heartMaterial.dispose();
      bokehGeo.dispose();
      bokehMat.dispose();
      petalTemplateGeo.dispose();
      fallingPetalMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {!webGLSupported && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#090314] via-[#1a082b] to-[#0a0213] flex items-center justify-center">
          <div className="text-center p-6 bg-romantic-wine/40 backdrop-blur-md rounded-2xl border border-rose-500/30">
            <span className="text-4xl animate-bounce inline-block">🌹</span>
            <p className="text-rose-200 mt-2 font-handwriting text-2xl">
              Asmita Ji... Romantic World Loaded With Love ❤️
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
