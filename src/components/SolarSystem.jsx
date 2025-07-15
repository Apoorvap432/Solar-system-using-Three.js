import React, { useEffect, useRef }  from 'react'
import * as THREE from 'three';

const SolarSystem = ({ speeds }) => {
    const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1.5);
    scene.add(light);

    // Sun
    const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Planets
    const planets = [];
    const distances = [4, 6, 8, 10, 13, 16, 19, 22];
    const sizes = [0.3, 0.5, 0.6, 0.4, 1.2, 1.1, 0.9, 0.85];
    const colors = [
      0xaaaaaa,
      0xff9900,
      0x0000ff,
      0xff0000,
      0xffa500,
      0xffffcc,
      0x66ccff,
      0x3366ff,
    ];
    const planetNames = Object.keys(speeds);

    planetNames.forEach((name, i) => {
      const geometry = new THREE.SphereGeometry(sizes[i], 32, 32);
      const material = new THREE.MeshStandardMaterial({ color: colors[i] });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData = { angle: Math.random() * Math.PI * 2 };
      planets.push(mesh);
      scene.add(mesh);
    });

    camera.position.z = 30;

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      planetNames.forEach((name, i) => {
        const planet = planets[i];
        planet.userData.angle += delta * speeds[name];
        const dist = distances[i];
        planet.position.x = Math.cos(planet.userData.angle) * dist;
        planet.position.z = Math.sin(planet.userData.angle) * dist;
      });

      renderer.render(scene, camera);
    }

    animate();
    
  return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [speeds]);

  return <div ref={mountRef} />;
}


export default SolarSystem
