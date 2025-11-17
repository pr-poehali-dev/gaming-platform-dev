import * as THREE from 'three';

const RobloxCharacter = ({ position = [0, 2, 0] }: { position?: [number, number, number] }) => {
  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.8, 1, 0.4]} />
        <meshStandardMaterial color="#0EA5E9" />
      </mesh>

      <mesh position={[0, 2.8, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#FCD34D" />
      </mesh>

      <mesh position={[-0.5, 1.2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.9, 0.3]} />
        <meshStandardMaterial color="#0EA5E9" />
      </mesh>

      <mesh position={[0.5, 1.2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.9, 0.3]} />
        <meshStandardMaterial color="#0EA5E9" />
      </mesh>

      <mesh position={[-0.25, 0.4, 0]} castShadow>
        <boxGeometry args={[0.35, 0.9, 0.35]} />
        <meshStandardMaterial color="#10B981" />
      </mesh>

      <mesh position={[0.25, 0.4, 0]} castShadow>
        <boxGeometry args={[0.35, 0.9, 0.35]} />
        <meshStandardMaterial color="#10B981" />
      </mesh>
    </group>
  );
};

export default RobloxCharacter;