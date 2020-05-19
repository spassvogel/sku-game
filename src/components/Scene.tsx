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
import { gsap, Linear } from 'gsap'
import Guy from "./pixi/Guy";
import { GameState } from "reducers/gameStateReducer";
import { PickingList } from "reducers/pickingListsReducer";
import { AppState } from "appState";

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
  const guyRef = useRef<PIXI.AnimatedSprite>(null);
  const [carryBox, setCarryBox] = useState<boolean>(false);
  const [guyPosition, setGuyPosition] = useState<[number, number]>([10, 12]);

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

  /** Returns the location of the rack at given location 
   *  The tile south of a rack counts too. When no rack is found
   * returns undefined */
  const getRackAtLocation = useCallback((location: [number, number]) => {
    // Racks are two tiles high but the box is placed at the top tile
    return rackLocations.find((l) => (l[0] === location[0] && (l[1] === location[1] || l[1] === location[1] - 1)))
  }, [rackLocations]);

  const getDockAtLocation = useCallback((location: [number, number]) => {
    return dockLocations.find((l) => (l[0] === location[0] && l[1] === location[1]))
  }, [dockLocations]);

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

  /** Picking logic! */

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

  const getProductLocation = useCallback((productCode: string) => {
    return state.warehouse.boxes[productCode].location;
  }, [state.warehouse.boxes]);

  const walking = useRef<boolean>(false);
  useEffect(() => {
    // Picking boxes part begins
    if(state.gameState === GameState.pickingBoxes && !walking.current) {
      walking.current = true;

      const convertLocation = (location: [number, number]) => {
        // This is the format AStarFind works with
        return { x: location[0], y: location[1] }
      }

      const startPicking = (pickingList: PickingList) => {
        const { orderNo } = pickingList;
        const startLocation = convertLocation([10, 12]); // absolute start location       
        let pathStartLocation = startLocation; // Start location of the current objective (product)
        const tl = gsap.timeline({
          repeat: 0, 
          repeatDelay: 0
        });
        const guy = guyRef.current;


        // Note: here we attempt to show the picking animation as one big gsap.timeline. 
        // Consider finding the first unpicked item and walk there
        pickingList.products.forEach(productCode => {
          console.log(`We need to pick ${productCode}. It's location is ${getProductLocation(productCode)}`);
          
          // Determine the path to this product
          const path = aStar?.findPath(pathStartLocation, convertLocation(getProductLocation(productCode))) || [];
          console.log('startloc:', pathStartLocation)
          //console.log(path)
          
          // create animation to walk this path
          path.forEach((position: number[]) => {
            tl.to(guy, {
              ease: Linear.easeNone,
              pixi: { 
                x: position[0] * mapData!.tilewidth,
                y: position[1] * mapData!.tileheight
              }, 
              duration: .1
            });
            pathStartLocation = convertLocation([position[0], position[1]]) 
          }); 
          tl.to(guy, {
            onComplete: () => { 
              // completed picking product
              setCarryBox(true);
              dispatch({ type: 'completeProductPick', productCode, orderNo});
              console.log('completed p', productCode, orderNo)
              //setGuyPosition([pathStartLocation.x, pathStartLocation.y]);
              //guyRef.current!.position = new PIXI.Point(pathStartLocation.x * mapData!.tilewidth, pathStartLocation.y * mapData!.tileheight)
            },
          })
        });
        // Go back to start
        const path = aStar?.findPath(pathStartLocation, startLocation) || [];
        path.forEach((position: number[]) => {
          pathStartLocation = convertLocation([position[0], position[1]]) 
          tl.to(guy, {
            ease: Linear.easeNone,
            pixi: { 
              x: position[0] * mapData!.tilewidth,
              y: position[1] * mapData!.tileheight
            }, 
            duration: .1,
            onComplete: () => { 
              // completed picking list
            }, 
          });
        }); 
      }

      startPicking({ ...state.pickingLists[0]});
    }
  }, [state.gameState, getProductLocation, aStar, mapData, dispatch, state.pickingLists]);

  

  const handleGuyDown = () => {
    // test for the guy to walk
    if (!mapData || !guyRef.current) return;
    gsap.killTweensOf(guyRef.current);
    const path: [number, number][] = [
      //[10, 12],
      [10, 11],
      [9, 11],
      [9, 10],
      [8, 10],
      [7, 10],
      [8, 10],
      [9, 10],
      [7, 10],
      [6, 10],
      [5, 10],
      [6, 10],
      [7, 10],
      [8, 10],
      [9, 10],
      [9, 11],
      [9, 12],
      [10, 12],
      [11, 12],
      [11, 11],
      [10, 11],
      //[10, 12],
    ]
    // construct a timeline
    const tl = gsap.timeline({
      //repeat: -1, 
      repeatDelay: 0
    });
    path.forEach((position: [number, number]) => {
      tl.to(guyRef.current, {
        onStart: () => { },
        ease: Linear.easeNone,
        pixi: { 
          x: position[0] * mapData?.tilewidth,
          y: position[1] * mapData?.tileheight
        }, 
        duration: 1
      });
    })
  };

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
            <Guy 
              atlas={`${process.env.PUBLIC_URL}/images/sprites/guy/guy.json`} 
              carryBox={carryBox}
              x={guyPosition[0] * mapData.tilewidth} 
              y={guyPosition[1] * mapData.tileheight} 
              ref={guyRef}
              interactive
              mousedown={handleGuyDown} //todo :remove
            />
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
