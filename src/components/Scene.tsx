import React, { useEffect, useState, useRef, useCallback, useContext, useMemo } from "react";
import { Container, Stage, Sprite } from '@inlet/react-pixi';
import { AStarFinder } from "astar-typescript";
import { TiledMapData, TiledObjectData } from 'constants/tiledMapData';
import Tilemap from './Tilemap';
import BridgedStage from "./pixi/util/BridgedStage";
import { AppContext } from "./context/AppProvider";
import * as PIXI from 'pixi.js';
import Box from "./pixi/Box";
import { PixiPlugin } from 'gsap/all';
import { gsap } from 'gsap'
import { GameState } from "reducers/gameStateReducer";
import WarehouseGuy from "./pixi/WarehouseGuy";
import sound from 'pixi-sound';
import { PickingList } from "reducers/pickingListsReducer";

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);

window.PIXI = PIXI;
// eslint-disable-next-line import/first
import 'pixi-tilemap'; // tilemap is not a real npm module :/

export interface Props {
  tilemap: string;
  width: number;
  height: number;
  onProductClick: (productCode: string) => void;
}

const Scene = (props: Props & React.ComponentProps<typeof Container>) => {
  const {tilemap, width, height, ...restProps} = props;
  const {state, dispatch} = useContext(AppContext);
  const {warehouse} = state;

  const [mapData, setMapData] = useState<TiledMapData>();
  const [objects, setObjects] = useState<{[key: string]: TiledObjectData}>();
  const [wallLocations, setWallLocations] = useState<[number, number][]>([]);
  const [selectedBox, setSelectedBox] = useState<string>();
  const ref = useRef<PIXI.Container>(null);

  const jsonPath = `${process.env.PUBLIC_URL}/${tilemap}`;

  useEffect(() => {
    new PIXI.Loader().add(jsonPath).load((loader)=>{         
      const mapData: TiledMapData = loader.resources[jsonPath].data;
      setMapData(mapData);
    });
  }, [jsonPath]);

  const basePath = jsonPath.substr(0, jsonPath.lastIndexOf('/'));

  useEffect(() => {
    sound.add('snap', `${process.env.PUBLIC_URL}/sound/snap.wav`);    
    sound.add('whoosh', `${process.env.PUBLIC_URL}/sound/whoosh.mp3`);    
    sound.add('bennyHill', `${process.env.PUBLIC_URL}/sound/BennyHill.mp3`);    
  }, []);

  useEffect(() => {
    if (state.gameState === GameState.pickingBoxes && !state.muted) {
      sound.play('bennyHill'); 
    } else {
      sound.stop('bennyHill');
    }
  }, [state.gameState, state.muted])


  const getObject = useCallback((location: [number, number]) => {
    return objects?.[`${location[0]},${location[1]}`];
  }, [objects]);

  /** Returns the object if a rack is at given location */
  const getRackAtLocation = useCallback((location: [number, number]) => {
    // 
    const object = getObject(location);
    const isRack = object?.properties?.some(p => p.name === 'rack' && p.value);
    if (isRack) {
      return object;
    }
  }, [getObject]);

  /** Returns the object if a rack is at given location */
  const getDockAtLocation = useCallback((location: [number, number]) => {
    // 
    const object = getObject(location);
    const isDock = object?.properties?.some(p => p.name === 'dock' && p.value);
    if (isDock) {
      return object;
    }
  }, [getObject]);

  const getProductLocation = (productCode: string): { location: [number, number], far: boolean } => {
    const {location} = state.warehouse.boxes[productCode];
    //const far = !!rackFarLocations.find((l) => (l[0] === location[0] && l[1] === location[1]));
    const far = false;
    // Some products are considered 'far', it takes longer to pick those
    return {
      location,
      far
    };
  };
  
  // Converts pixel coordinate to scene location
  const pointToSceneLocation = useCallback((point: PIXI.Point): [number, number] => {
    if (!mapData?.tilewidth || !mapData.tileheight) {
      return [0, 0];
    }
    return [Math.floor(point.x / mapData?.tilewidth), Math.floor(point.y / mapData?.tileheight)];
  }, [mapData]);
  
  const getBoxNameAtLocation = (location: [number, number]) => {
    const entry = Object.entries(warehouse.boxes)
      .find(([name, box]) => box.location[0] === location[0] && box.location[1] === location[1]);
    if (entry) return entry[0];
  }

  const handleClick = (productCode: string, event: PIXI.interaction.InteractionEvent) => {
    props.onProductClick(productCode);

    setSelectedBox(productCode);
  }


  const handleDragged = (productCode: string, event: PIXI.interaction.InteractionEvent) => {
    const position = event.data.global;
    const location = pointToSceneLocation(position); // tile location

    const object = getObject(location);
    const isRack = object?.type === "rack";
    let tint = 0xFFFFFF;
    if (isRack) {
      const otherBoxName = getBoxNameAtLocation(location);
      if (!otherBoxName || otherBoxName === productCode) {
        tint = 0x00FF30; // Can drop here
      } else {
        tint = 0xFF3300; // Can't drop on another box
      }
    }
    setTint(event.currentTarget, tint);
  }

  const handleBoxDragEnd = (productCode: string, event: PIXI.interaction.InteractionEvent) => {
    const position = event.data.global;
    const location = pointToSceneLocation(position); // tile location

    setTint(event.currentTarget, 0xFFFFFF);

    const object = getObject(location);

    if (object) {
      const otherBoxName = getBoxNameAtLocation(location);
      if (!otherBoxName || otherBoxName === productCode) {

        if (otherBoxName !== productCode && !state.muted) sound.play('snap'); 
        dispatch({ type: 'placeBox', productCode, location, destinationType: object.type});
        return;
      }
    }

    // Couldn't place, fly back to origin
    const box = warehouse.boxes[productCode];
    const originX = box.location[0] * mapData!.tilewidth;
    const originY = box.location[1] * mapData!.tileheight;

    if (!state.muted) sound.play('whoosh'); 
    gsap.to(event.currentTarget, { 
      duration: .5,
      ease: "bounce.out",
      pixi: {
        x: originX,
        y: originY
      }
    });
  }

  const renderFloorStuff = () => {
    return (
      <>
        <Sprite x={127} y={383} image={`${process.env.PUBLIC_URL}/images/sprites/floor/inbound.png`} />
        <Sprite x={544} y={383} image={`${process.env.PUBLIC_URL}/images/sprites/floor/outbound.png`} />
      </>
    );
  }

  const renderBoxes = () => {
    if (!mapData || !wallLocations.length) return null;
    
    return Object.entries(warehouse.boxes).map(([name, box]) => (
      <Box 
        location={box.location} 
        tileWidth={mapData.tilewidth} 
        tileHeight={mapData.tileheight}
        selected={name === selectedBox}
        onClick={(event) => handleClick(name, event)}
        onDragged={(event) => handleDragged(name, event)}
        onReleased={(event) => handleBoxDragEnd(name, event)}
        key={name}
        behindWall={isNorthOfWall(box.location, wallLocations)}
        interactive={state.gameState === GameState.placingBoxes}
      />
    ));
  }

  /** Returns true if the tile is blocked */
  const locationIsBlocked = useCallback((location: [number, number]) => {
    return wallLocations.some((l) => l[0] === location[0] && l[1] === location[1]);
  }, [wallLocations]);

  const aStar = useMemo(() => {
    if (!mapData || !wallLocations.length) {
        return null;
    }
    const matrix: number[][] = [];
    for (let y = 0; y < mapData.height; y++) {
        const row: number[] = [];
        for (let x = 0; x < mapData.width; x++) {
            const location: [number, number] = [x, y];
            const blocked = locationIsBlocked(location);
            row.push(blocked ? 1 : 0);
        }
        matrix.push(row);
    }
    return new AStarFinder({
      grid: {
          matrix
      },
      diagonalAllowed: false,
      includeStartNode: false,
      heuristic: "Manhatten",
      weight: 0,
    });
  }, [mapData, locationIsBlocked, wallLocations]);

  const [pickingList1, setPickingList1] = useState<PickingList>();
  const [pickingList2, setPickingList2] = useState<PickingList>();
  const [pickingList3, setPickingList3] = useState<PickingList>();

  useEffect(() => {
    if (state.gameState === GameState.pickingBoxes) {
      setSelectedBox(undefined);

      const nextPickingList1 = state.pickingLists.find((pL, i) => !pL.complete && i % 3 === 0);
      setPickingList1(nextPickingList1);
      const nextPickingList2 = state.pickingLists.find((pL, i) => !pL.complete && i % 3 === 1);
      setPickingList2(nextPickingList2);
      const nextPickingList3 = state.pickingLists.find((pL, i) => !pL.complete && i % 3 === 2);
      setPickingList3(nextPickingList3);
      if (!nextPickingList1 && !nextPickingList2 && !nextPickingList3) {
        dispatch({ type: 'completeGame' });
      }
    }
  }, [dispatch, state.gameState, state.pickingLists]);
  

  const renderGuys = () => {
    if (!aStar) return null;

    return (
      <>
        <WarehouseGuy
          name={'guy1'}
          pickingList={pickingList1}  
          homeLocation={[17, 12]}
          tileSize={mapData!.tilewidth}
          getProductLocation={getProductLocation}
          dispatch={dispatch}
          aStar={aStar}
          visible={state.gameState === GameState.pickingBoxes}
        />
        <WarehouseGuy
          name={'guy2'}
          pickingList={pickingList2}  
          homeLocation={[18, 12]}
          tileSize={mapData!.tilewidth}
          getProductLocation={getProductLocation}
          dispatch={dispatch}
          aStar={aStar}
          visible={state.gameState === GameState.pickingBoxes}
        />
        <WarehouseGuy
          name={'guy3'}
          pickingList={pickingList3}  
          homeLocation={[19, 12]}
          tileSize={mapData!.tilewidth}
          getProductLocation={getProductLocation}
          dispatch={dispatch}
          aStar={aStar}
          visible={state.gameState === GameState.pickingBoxes}
        />
      </> 
    )
  }

  return (
    <Stage width={width} height={height}>
      <Container 
        ref={ref}
        interactive={true}
        hitArea={new PIXI.RoundedRectangle(0, 0, width, height, 0)}
        sortableChildren
        {...restProps}
      >
        { mapData && (
          <>
            <Tilemap 
              basePath={basePath} 
              data={mapData} 
              setObjects={setObjects}
              setWallLocations={setWallLocations}
            />
            {renderFloorStuff()}
            {renderBoxes()}
            {renderGuys()}
          </>
        )}
      </Container>
    </Stage>
  );
}

export default Scene;

// Sets tint on box
const setTint = (obj: PIXI.DisplayObject, tint: number) => {
  const ghost = (obj as PIXI.Container).children.find(c => c.name === 'ghost');
  if (ghost) {
    (ghost as PIXI.Sprite).tint = tint; 
  }
}

// Returns true if the tile south of this one is a wall
const isNorthOfWall = (location: [number, number], wallLocations: [number, number][]) => {
  return wallLocations.some(wL => wL[0] === location[0] && wL[1] === location[1] + 1);
}
