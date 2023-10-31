import React, { useRef, useEffect } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"

export function Dragon({ hovered, ...props }) 
{
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("./models/Dragon_Evolved.gltf")
  const { actions } = useAnimations(animations, group)

  useEffect(() =>
  {
    const anim = hovered ? 'Headbutt' : 'Flying_Idle'
    actions[anim].reset().fadeIn(0.5).play()
    return () => actions[anim].fadeOut(0.5)
  }, [ hovered ])

  return (
    <group scale={ 0.5 } position-y={ -1 } ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <group name="Dragon">
            <skinnedMesh
              name="Cube221"
              geometry={nodes.Cube221.geometry}
              material={materials.Dragon_Main}
              skeleton={nodes.Cube221.skeleton}
            />
            <skinnedMesh
              name="Cube221_1"
              geometry={nodes.Cube221_1.geometry}
              material={materials.Dragon_Secondary}
              skeleton={nodes.Cube221_1.skeleton}
            />
            <skinnedMesh
              name="Cube221_2"
              geometry={nodes.Cube221_2.geometry}
              material={materials.Dragon_Horn}
              skeleton={nodes.Cube221_2.skeleton}
            />
            <skinnedMesh
              name="Cube221_3"
              geometry={nodes.Cube221_3.geometry}
              material={materials.Eye_Black}
              skeleton={nodes.Cube221_3.skeleton}
            />
            <skinnedMesh
              name="Cube221_4"
              geometry={nodes.Cube221_4.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Cube221_4.skeleton}
            />
          </group>
          <primitive object={nodes.Root} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./models/Dragon_Evolved.gltf");