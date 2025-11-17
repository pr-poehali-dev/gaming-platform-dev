import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { useState } from 'react';
import RobloxCharacter from './RobloxCharacter';

interface GameObject {
  id: string;
  type: 'cube' | 'sphere' | 'cylinder' | 'character';
  position: [number, number, number];
  color: string;
  scale: [number, number, number];
}

const GameObject3D = ({ obj, isSelected, onClick }: { obj: GameObject; isSelected: boolean; onClick: () => void }) => {
  if (obj.type === 'character') {
    return <RobloxCharacter position={obj.position} />;
  }

  const geometry = {
    cube: <boxGeometry args={obj.scale} />,
    sphere: <sphereGeometry args={[obj.scale[0] / 2, 32, 32]} />,
    cylinder: <cylinderGeometry args={[obj.scale[0] / 2, obj.scale[0] / 2, obj.scale[1], 32]} />
  }[obj.type];

  return (
    <mesh position={obj.position} onClick={onClick} castShadow receiveShadow>
      {geometry}
      <meshStandardMaterial 
        color={obj.color} 
        emissive={isSelected ? '#0EA5E9' : '#000000'}
        emissiveIntensity={isSelected ? 0.5 : 0}
      />
    </mesh>
  );
};

const GameEditor = () => {
  const [objects, setObjects] = useState<GameObject[]>([
    {
      id: 'character',
      type: 'character',
      position: [0, 0, 0],
      color: '#0EA5E9',
      scale: [1, 1, 1]
    }
  ]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  const selectedObject = objects.find(obj => obj.id === selectedObjectId);

  const addObject = (type: 'cube' | 'sphere' | 'cylinder') => {
    const newObject: GameObject = {
      id: `${type}-${Date.now()}`,
      type,
      position: [Math.random() * 10 - 5, 1, Math.random() * 10 - 5],
      color: type === 'cube' ? '#EF4444' : type === 'sphere' ? '#8B5CF6' : '#10B981',
      scale: [1, 1, 1]
    };
    setObjects([...objects, newObject]);
    setSelectedObjectId(newObject.id);
  };

  const updateSelectedObject = (key: keyof GameObject, value: any) => {
    if (!selectedObjectId) return;
    setObjects(objects.map(obj => 
      obj.id === selectedObjectId ? { ...obj, [key]: value } : obj
    ));
  };

  const deleteSelectedObject = () => {
    if (!selectedObjectId || selectedObjectId === 'character') return;
    setObjects(objects.filter(obj => obj.id !== selectedObjectId));
    setSelectedObjectId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      <div className="lg:col-span-1 space-y-4 overflow-y-auto">
        <div className="p-4 border-neon-purple/30 bg-card/80 backdrop-blur rounded-lg">
          <h3 className="text-lg font-bold text-neon-purple mb-4">Добавить объект</h3>
          <div className="space-y-2">
            <button 
              onClick={() => addObject('cube')}
              className="w-full flex items-center gap-2 px-4 py-2 border border-neon-purple/30 hover:border-neon-purple rounded-lg bg-card/50 hover:bg-neon-purple/10 transition-all"
            >
              <span className="text-2xl">🟥</span>
              <span>Куб</span>
            </button>
            <button 
              onClick={() => addObject('sphere')}
              className="w-full flex items-center gap-2 px-4 py-2 border border-neon-purple/30 hover:border-neon-purple rounded-lg bg-card/50 hover:bg-neon-purple/10 transition-all"
            >
              <span className="text-2xl">🟣</span>
              <span>Сфера</span>
            </button>
            <button 
              onClick={() => addObject('cylinder')}
              className="w-full flex items-center gap-2 px-4 py-2 border border-neon-purple/30 hover:border-neon-purple rounded-lg bg-card/50 hover:bg-neon-purple/10 transition-all"
            >
              <span className="text-2xl">🟢</span>
              <span>Цилиндр</span>
            </button>
          </div>
        </div>

        {selectedObject && (
          <div className="p-4 border-neon-cyan/30 bg-card/80 backdrop-blur rounded-lg">
            <h3 className="text-lg font-bold text-neon-cyan mb-4">Свойства объекта</h3>
            <div className="space-y-3 text-sm">
              <div>
                <label className="text-muted-foreground block mb-1">Позиция X</label>
                <input 
                  type="number" 
                  step="0.5"
                  className="w-full bg-muted/50 border border-neon-cyan/20 rounded px-3 py-2 focus:border-neon-cyan focus:outline-none" 
                  value={selectedObject.position[0]}
                  onChange={(e) => updateSelectedObject('position', [parseFloat(e.target.value), selectedObject.position[1], selectedObject.position[2]])}
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">Позиция Y</label>
                <input 
                  type="number" 
                  step="0.5"
                  className="w-full bg-muted/50 border border-neon-cyan/20 rounded px-3 py-2 focus:border-neon-cyan focus:outline-none" 
                  value={selectedObject.position[1]}
                  onChange={(e) => updateSelectedObject('position', [selectedObject.position[0], parseFloat(e.target.value), selectedObject.position[2]])}
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">Позиция Z</label>
                <input 
                  type="number" 
                  step="0.5"
                  className="w-full bg-muted/50 border border-neon-cyan/20 rounded px-3 py-2 focus:border-neon-cyan focus:outline-none" 
                  value={selectedObject.position[2]}
                  onChange={(e) => updateSelectedObject('position', [selectedObject.position[0], selectedObject.position[1], parseFloat(e.target.value)])}
                />
              </div>

              {selectedObject.type !== 'character' && (
                <>
                  <div>
                    <label className="text-muted-foreground block mb-1">Размер</label>
                    <input 
                      type="number" 
                      step="0.1"
                      min="0.1"
                      className="w-full bg-muted/50 border border-neon-cyan/20 rounded px-3 py-2 focus:border-neon-cyan focus:outline-none" 
                      value={selectedObject.scale[0]}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        updateSelectedObject('scale', [val, val, val]);
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground block mb-1">Цвет</label>
                    <input 
                      type="color" 
                      className="w-full h-10 bg-muted/50 border border-neon-cyan/20 rounded px-1 py-1 cursor-pointer" 
                      value={selectedObject.color}
                      onChange={(e) => updateSelectedObject('color', e.target.value)}
                    />
                  </div>
                  <button
                    onClick={deleteSelectedObject}
                    className="w-full mt-4 px-4 py-2 bg-destructive hover:bg-destructive/80 text-white rounded-lg font-medium transition-all"
                  >
                    Удалить объект
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="p-4 border-neon-purple/30 bg-card/80 backdrop-blur rounded-lg">
          <h3 className="text-lg font-bold text-neon-purple mb-2">Объекты на сцене</h3>
          <div className="space-y-1 text-sm">
            {objects.map(obj => (
              <button
                key={obj.id}
                onClick={() => setSelectedObjectId(obj.id)}
                className={`w-full text-left px-3 py-2 rounded transition-all ${
                  obj.id === selectedObjectId 
                    ? 'bg-neon-cyan/20 border border-neon-cyan text-neon-cyan' 
                    : 'hover:bg-muted/50 border border-transparent'
                }`}
              >
                {obj.type === 'character' ? '🧍 Персонаж' : `${obj.type === 'cube' ? '🟥' : obj.type === 'sphere' ? '🟣' : '🟢'} ${obj.type}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 border-neon-purple/30 border-2 bg-card/50 backdrop-blur rounded-lg overflow-hidden glow-purple">
        <Canvas
          shadows
          camera={{ position: [10, 10, 10], fov: 50 }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={['#87CEEB']} />
          <fog attach="fog" args={['#87CEEB', 30, 100]} />
          
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          <Grid 
            args={[100, 100]} 
            cellSize={1} 
            cellThickness={0.5} 
            cellColor="#0EA5E9" 
            sectionSize={5} 
            sectionThickness={1} 
            sectionColor="#8B5CF6" 
            fadeDistance={50} 
            fadeStrength={1}
            infiniteGrid
          />

          {objects.map(obj => (
            <GameObject3D 
              key={obj.id} 
              obj={obj} 
              isSelected={obj.id === selectedObjectId}
              onClick={() => setSelectedObjectId(obj.id)}
            />
          ))}

          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </div>
  );
};

export default GameEditor;