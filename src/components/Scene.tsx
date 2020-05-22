import React, { useEffect, useState, useRef, useCallback, useContext, useMemo } from "react";
import { Container, Stage } from '@inlet/react-pixi';
import { AStarFinder } from "astar-typescript";
import { TiledMapData } from 'constants/tiledMapData';
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
  const [rackLocations, setRackLocations] = useState<[number, number][]>([]);
  const [dockLocations, setDockLocations] = useState<[number, number][]>([]);
  const [wallLocations, setWallLocations] = useState<[number, number][]>([]);   
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
    sound.add('bennyHill', `${process.env.PUBLIC_URL}/sound/BennyHill.mp3`);    
  }, []);

  useEffect(() => {
    if (state.gameState === GameState.pickingBoxes) {
      sound.play('bennyHill'); 
    }
  }, [state.gameState])

  /** Returns the location of the rack at given location 
   *  The tile south of a rack counts too. When no rack is found
   * returns undefined */
  const getRackAtLocation = useCallback((location: [number, number]) => {
    // Racks are two tiles high but the box is placed at the top tile
    // return rackLocations.find((l) => (l[0] === location[0] && (l[1] === location[1] || l[1] === location[1] + 1)))
    return rackLocations.find((l) => (l[0] === location[0] && l[1] === location[1]))
  }, [rackLocations]);

  const getDockAtLocation = useCallback((location: [number, number]) => {
    return dockLocations.find((l) => (l[0] === location[0] && l[1] === location[1]))
  }, [dockLocations]);

  const getProductLocation = (productCode: string) => {
    return state.warehouse.boxes[productCode].location;
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
  }

  const handleDragged = (productCode: string, event: PIXI.interaction.InteractionEvent) => {
    const position = event.data.global;
    const location = pointToSceneLocation(position); // tile location

    const rackLocation = getRackAtLocation(location) || getDockAtLocation(location);

    let tint = 0xFFFFFF;
    if (rackLocation) {
      const otherBoxName = getBoxNameAtLocation(rackLocation);
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

    const rackLocation = getRackAtLocation(location);
    const dockLocation = getDockAtLocation(location);
    const rackOrDockLoc = rackLocation || dockLocation;
    if (rackOrDockLoc) {
      const otherBoxName = getBoxNameAtLocation(rackOrDockLoc);
      if (!otherBoxName || otherBoxName === productCode) {
        const inRack = !!rackLocation;
        dispatch({ type: 'placeBox', productCode, location: rackOrDockLoc!, inRack});
        return;
      }
    }

    // Couldn't place, fly back to origin
    const box = warehouse.boxes[productCode];
    const originX = box.location[0] * mapData!.tilewidth;
    const originY = box.location[1] * mapData!.tileheight;

    gsap.to(event.currentTarget, { 
      duration: .5,
      ease: "bounce.out",
      pixi: {
        x: originX,
        y: originY
      }
    });
  }

  const renderBoxes = () => {
    if (!mapData || !wallLocations.length) return null;
    
    return Object.entries(warehouse.boxes).map(([name, box]) => (
      <Box 
        location={box.location} 
        tileWidth={mapData.tilewidth} 
        tileHeight={mapData.tileheight}
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


  const renderGuys = () => {
    const nextPickingList = state.pickingLists.find(pL => !pL.complete);
    if (!nextPickingList) return null;
    if (!aStar) return null;

    return (
      <WarehouseGuy
        pickingList={nextPickingList}  
        startLocation={[10, 12]}
        tileSize={mapData!.tilewidth}
        getProductLocation={getProductLocation}
        dispatch={dispatch}
        aStar={aStar}
        visible={state.gameState === GameState.pickingBoxes}
      /> 
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
              setRackLocations={setRackLocations}
              setDockLocations={setDockLocations}
              setWallLocations={setWallLocations}
            />
            { renderBoxes() }
            { renderGuys() }
            {/* <Guy 
              atlas={`${process.env.PUBLIC_URL}/images/sprites/guy/guy.json`} 
              carryBox={carryBox}
              x={guyLocation[0] * mapData.tilewidth} 
              y={guyLocation[1] * mapData.tileheight} 
              ref={guyRef}
            /> */}
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
