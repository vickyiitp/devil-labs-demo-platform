'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { NexaProduct } from '@/lib/nexaData';
import { Maximize2, Minimize2, RotateCw, Sparkles, Layers, ShieldCheck, Cpu, Sliders, Info, Eye } from 'lucide-react';

interface ComponentViewer3DProps {
  product: NexaProduct;
  onRequestQuote?: () => void;
}

export default function ComponentViewer3D({ product, onRequestQuote }: ComponentViewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [exploded, setExploded] = useState<boolean>(false);
  const [explodeFactor, setExplodeFactor] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string | null>('MATERIAL');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<typeof product.hotspots[0] | null>(
    product.hotspots[0] || null
  );
  const [lightingMode, setLightingMode] = useState<'STUDIO' | 'CLEANROOM' | 'HIGH_CONTRAST'>('STUDIO');

  // Three.js internal refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const partsGroupRef = useRef<THREE.Group | null>(null);
  const partsListRef = useRef<{ mesh: THREE.Mesh | THREE.Group; originalPos: THREE.Vector3; targetOffset: THREE.Vector3 }[]>([]);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const reqIdRef = useRef<number | null>(null);

  // Smooth explosion lerp value
  const currentExplodeRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(lightingMode === 'CLEANROOM' ? 0x12151B : 0x0A0B0D);
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 7.5);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Environment
    const ambientLight = new THREE.AmbientLight(0xffffff, lightingMode === 'CLEANROOM' ? 1.2 : 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    // Rim crimson accent light for NEXA industrial styling
    const rimLight = new THREE.DirectionalLight(0xe11d48, 2.0);
    rimLight.position.set(-6, -4, -5);
    scene.add(rimLight);

    const studioFill = new THREE.PointLight(0x38bdf8, 1.2, 10);
    studioFill.position.set(-4, 3, 4);
    scene.add(studioFill);

    // 5. Grid Ground Reflection
    const gridHelper = new THREE.GridHelper(12, 24, 0xe11d48, 0x222630);
    gridHelper.position.y = -2.2;
    scene.add(gridHelper);

    // 6. Build Precision Component 3D Assembly
    const mainGroup = new THREE.Group();
    partsGroupRef.current = mainGroup;
    scene.add(mainGroup);

    partsListRef.current = [];

    // Metallic Materials
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.18,
      envMapIntensity: 1.5,
    });

    const inconelMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.95,
      roughness: 0.12,
    });

    const crimsonAccentMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x4c0519,
      emissiveIntensity: 0.4,
    });

    const ceramicSealMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.1,
      roughness: 0.05,
    });

    // Component 1: Core Disk / Hub
    const coreGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 32);
    const coreMesh = new THREE.Mesh(coreGeo, inconelMat);
    coreMesh.castShadow = true;
    coreMesh.receiveShadow = true;
    mainGroup.add(coreMesh);
    partsListRef.current.push({
      mesh: coreMesh,
      originalPos: new THREE.Vector3(0, 0, 0),
      targetOffset: new THREE.Vector3(0, 0, 0),
    });

    // Component 2: Blade Ring / Turbine Impeller Assembly
    const bladeGroup = new THREE.Group();
    const bladeCount = 16;
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      const bladeGeo = new THREE.BoxGeometry(0.15, 0.8, 0.5);
      const bladeMesh = new THREE.Mesh(bladeGeo, titaniumMat);
      bladeMesh.position.set(Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5);
      bladeMesh.rotation.y = -angle + Math.PI / 4;
      bladeMesh.rotation.z = 0.2;
      bladeMesh.castShadow = true;
      bladeGroup.add(bladeMesh);
    }
    mainGroup.add(bladeGroup);
    partsListRef.current.push({
      mesh: bladeGroup,
      originalPos: new THREE.Vector3(0, 0, 0),
      targetOffset: new THREE.Vector3(0, 1.8, 0),
    });

    // Component 3: Precision Core Drive Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.4, 0.4, 3.2, 32);
    const shaftMesh = new THREE.Mesh(shaftGeo, titaniumMat);
    shaftMesh.castShadow = true;
    mainGroup.add(shaftMesh);
    partsListRef.current.push({
      mesh: shaftMesh,
      originalPos: new THREE.Vector3(0, 0, 0),
      targetOffset: new THREE.Vector3(0, -1.8, 0),
    });

    // Component 4: High-Pressure Ceramic Seal Ring
    const sealGeo = new THREE.TorusGeometry(1.6, 0.12, 16, 48);
    const sealMesh = new THREE.Mesh(sealGeo, ceramicSealMat);
    sealMesh.rotation.x = Math.PI / 2;
    mainGroup.add(sealMesh);
    partsListRef.current.push({
      mesh: sealMesh,
      originalPos: new THREE.Vector3(0, 0, 0),
      targetOffset: new THREE.Vector3(1.8, 0, 0),
    });

    // Component 5: Retention Lock Collar & Flange
    const flangeGeo = new THREE.CylinderGeometry(1.9, 1.9, 0.2, 32);
    const flangeMesh = new THREE.Mesh(flangeGeo, crimsonAccentMat);
    flangeMesh.castShadow = true;
    mainGroup.add(flangeMesh);
    partsListRef.current.push({
      mesh: flangeMesh,
      originalPos: new THREE.Vector3(0, 0, 0),
      targetOffset: new THREE.Vector3(-1.8, 0, 0),
    });

    // 7. Mouse Interaction Controls
    const dom = renderer.domElement;

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !partsGroupRef.current) return;

      const deltaX = e.clientX - previousMousePosRef.current.x;
      const deltaY = e.clientY - previousMousePosRef.current.y;

      partsGroupRef.current.rotation.y += deltaX * 0.008;
      partsGroupRef.current.rotation.x += deltaY * 0.008;

      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!cameraRef.current) return;
      e.preventDefault();
      cameraRef.current.position.z = THREE.MathUtils.clamp(
        cameraRef.current.position.z + e.deltaY * 0.004,
        4.0,
        14.0
      );
    };

    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Animation Loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      reqIdRef.current = requestAnimationFrame(animate);

      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      // Auto rotation if enabled and not dragging
      if (autoRotate && !isDraggingRef.current && partsGroupRef.current) {
        partsGroupRef.current.rotation.y += delta * 0.35;
      }

      // Lerp exploded offsets
      const targetFactor = exploded ? 1.0 : explodeFactor;
      currentExplodeRef.current = THREE.MathUtils.lerp(currentExplodeRef.current, targetFactor, 0.08);

      partsListRef.current.forEach((item) => {
        item.mesh.position.x = item.originalPos.x + item.targetOffset.x * currentExplodeRef.current;
        item.mesh.position.y = item.originalPos.y + item.targetOffset.y * currentExplodeRef.current;
        item.mesh.position.z = item.originalPos.z + item.targetOffset.z * currentExplodeRef.current;
      });

      renderer.render(scene, camera);
    };

    reqIdRef.current = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('wheel', handleWheel);
      renderer.dispose();
    };
  }, [product, lightingMode]);

  // Handle Exploded Toggle
  const toggleExploded = () => {
    const next = !exploded;
    setExploded(next);
    setExplodeFactor(next ? 1.0 : 0);
  };

  // Filter hotspots by selected category
  const filteredHotspots = activeCategory
    ? product.hotspots.filter((h) => h.category === activeCategory)
    : product.hotspots;

  return (
    <div className="relative w-full bg-[#0B0C0E] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Header HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-[#121418]/90 border-b border-white/10 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E11D48] animate-pulse" />
          <div>
            <div className="text-xs font-mono text-[#E11D48] tracking-wider uppercase font-semibold">
              REAL-TIME WEBGL INSPECTION
            </div>
            <div className="text-lg font-bold text-white tracking-tight font-tech">
              {product.partNumber} // {product.name}
            </div>
          </div>
        </div>

        {/* Top Control Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Exploded View Toggle Button */}
          <button
            onClick={toggleExploded}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold rounded-md transition-all duration-300 border ${
              exploded
                ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>EXPLODED VIEW {exploded ? '[ACTIVE]' : '[INACTIVE]'}</span>
          </button>

          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-md border transition-all ${
              autoRotate
                ? 'bg-white/10 text-white border-white/20'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span>AUTO-ORBIT</span>
          </button>

          {/* Lighting Mode Selector */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-md p-1">
            <button
              onClick={() => setLightingMode('STUDIO')}
              className={`px-2.5 py-1 text-[10px] font-mono rounded ${
                lightingMode === 'STUDIO' ? 'bg-[#E11D48] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              STUDIO
            </button>
            <button
              onClick={() => setLightingMode('CLEANROOM')}
              className={`px-2.5 py-1 text-[10px] font-mono rounded ${
                lightingMode === 'CLEANROOM' ? 'bg-[#E11D48] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              CLEANROOM
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Stage + Hotspot Sidebar */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* 3D Canvas Mount */}
        <div
          ref={mountRef}
          className="lg:col-span-8 relative w-full h-[500px] lg:h-[580px] cursor-grab active:cursor-grabbing bg-gradient-to-b from-[#111317] to-[#08090B]"
        >
          {/* Overlay HUD Telemetry */}
          <div className="absolute top-4 left-4 pointer-events-none space-y-1 font-mono text-[11px] text-gray-400/80 bg-black/50 p-3 rounded border border-white/10 backdrop-blur-sm">
            <div>CAD TOLERANCE: <span className="text-white">±0.002mm</span></div>
            <div>ALLOY SPEC: <span className="text-white">{product.material.split(' ')[0]}</span></div>
            <div>EXPLODE DISPLACEMENT: <span className="text-[#E11D48]">{(explodeFactor * 100).toFixed(0)}%</span></div>
            <div>ROTATION SPEED: <span className="text-white">{autoRotate ? '0.35 rad/s' : 'PAUSED'}</span></div>
          </div>

          {/* Instruction Overlay */}
          <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-2 text-[11px] font-mono text-gray-400 bg-black/60 px-3 py-1.5 rounded border border-white/10">
            <Info className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>DRAG TO ROTATE 360° | SCROLL TO ZOOM IN/OUT</span>
          </div>
        </div>

        {/* Interactive Hotspots Sidebar */}
        <div className="lg:col-span-4 bg-[#0F1115] border-t lg:border-t-0 lg:border-l border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-[#E11D48] tracking-wider uppercase">
                CRITICAL HOTSPOTS
              </span>
              <span className="text-xs font-mono text-gray-400">
                {product.hotspots.length} INSPECTION POINTS
              </span>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {['MATERIAL', 'DIMENSIONS', 'CAPACITY', 'CERTIFICATION', 'APPLICATION', 'COMPONENTS'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(activeCategory === cat ? null : cat);
                    const match = product.hotspots.find((h) => h.category === cat);
                    if (match) setActiveHotspot(match);
                  }}
                  className={`px-2.5 py-1 text-[10px] font-mono font-semibold rounded tracking-wide border transition-all ${
                    activeCategory === cat
                      ? 'bg-[#E11D48]/20 text-[#E11D48] border-[#E11D48]'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Hotspot List Selection */}
            <div className="space-y-2 mb-6 max-h-[220px] overflow-y-auto pr-1">
              {filteredHotspots.map((hs, idx) => {
                const isSelected = activeHotspot?.title === hs.title;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveHotspot(hs)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-[#1A1D24] border-[#E11D48] shadow-sm'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-white">{hs.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                        {hs.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2 font-sans">{hs.detail}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Hotspot Deep Detail Spec Box */}
            {activeHotspot && (
              <div className="bg-[#14171E] border border-[#E11D48]/40 rounded-lg p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#E11D48]/10 blur-xl pointer-events-none" />
                <div className="text-[11px] font-mono text-[#E11D48] font-bold uppercase mb-1">
                  SPECIFICATION READOUT // {activeHotspot.category}
                </div>
                <div className="text-sm font-bold text-white mb-2">{activeHotspot.title}</div>
                <div className="text-xs text-gray-300 leading-relaxed font-sans">{activeHotspot.detail}</div>
              </div>
            )}
          </div>

          {/* Request Quote CTA Button */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <button
              onClick={onRequestQuote}
              className="w-full group relative py-3.5 px-6 bg-[#E11D48] hover:bg-[#F43F5E] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 shadow-[0_0_25px_rgba(225,29,72,0.3)] hover:shadow-[0_0_35px_rgba(225,29,72,0.5)] flex items-center justify-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine pointer-events-none" />
              <span>CONFIGURE &amp; REQUEST QUOTE FOR THIS PRODUCT</span>
              <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
