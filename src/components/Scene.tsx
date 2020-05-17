import React, { useEffect, useState, useRef, useCallback, useReducer } from "react";
import { Container, Stage } from '@inlet/react-pixi';
import { AStarFinder } from "astar-typescript";
import { TiledMapData } from 'constants/tiledMapData';
import Tilemap from './Tilemap';
import BridgedStage from "./pixi/util/BridgedStage";
import * as PIXI from 'pixi.js';
import Box from "./pixi/Box";
import { WarehouseStore } from "constants/warehouseStore";
import { reducer, initialState } from "./store/sceneStore";
import { PixiPlugin } from 'gsap/all';
import { gsap } from 'gsap'

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);

window.PIXI = PIXI;
// eslint-disable-next-line import/first
import 'pixi-tilemap'; // tilemap is not a real npm module :/

export interface Props {
    tilemap: string;
    width: number;
    height: number;
}

const Scene = (props: Props & React.ComponentProps<typeof Container>) => {
    const {tilemap, width, height, ...restProps} = props;
    // const [store, setStore] = useState<WarehouseStore>()
    const [state, dispatch] = useReducer(reducer, initialState);
    const [mapData, setMapData] = useState<TiledMapData>();
    const [rackPositions, setRackPositions] = useState<[number, number][]>([]);
    const ref = useRef<PIXI.Container>(null);

    const jsonPath = `${process.env.PUBLIC_URL}/${tilemap}`;

    useEffect(() => {
        new PIXI.Loader().add(jsonPath).load((loader)=>{            
            const mapData: TiledMapData = loader.resources[jsonPath].data;
            setMapData(mapData);
        });
    }, [jsonPath]);

    const basePath = jsonPath.substr(0, jsonPath.lastIndexOf('/'));

    /** Returns the location of the rack at given location */
    const getRackAtLocation = useCallback((location: [number, number]) => {
        // Racks are two tiles high but the box is placed at the top tile
        return rackPositions.find((l) => (l[0] === location[0] && (l[1] === location[1] || l[1] === location[1] - 1)))
    }, [rackPositions]);

     // Converts pixel coordinate to scene location
     const pointToSceneLocation = useCallback((point: PIXI.Point): [number, number] => {
        if (!mapData?.tilewidth || !mapData.tileheight) {
            return [0, 0];
        }
        return [Math.floor(point.x / mapData?.tilewidth), Math.floor(point.y / mapData?.tileheight)];
    }, [mapData]);
    
    const handleDragged = (event: PIXI.interaction.InteractionEvent) => {
        const position = event.data.global;
        const location = pointToSceneLocation(position); // tile location

        const rack = getRackAtLocation(location);

        let tint = 0xFFFFFF;
        if (rack) {
            tint = 0xFF3300;
        }
        setTint(event.currentTarget, tint);
    }

    const handleBoxDragEnd = (boxName: string, event: PIXI.interaction.InteractionEvent) => {
        const position = event.data.global;
        const location = pointToSceneLocation(position); // tile location

        const rack = getRackAtLocation(location);

        if (rack) {
            setTint(event.currentTarget, 0xFFFFFF);
            dispatch({ type: 'placeBoxInRack', boxName, rack});
        } else {
            const box = state.boxes[boxName];
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
    }

    return (
        <>
            <Container 
                ref={ref}
                interactive={true}
                hitArea={new PIXI.RoundedRectangle(0, 0, width, height, 0)}
                sortableChildren
                {...restProps}
            >
                { mapData && (
                    <>
                        <Tilemap basePath={basePath} data={mapData} setRackPositions={setRackPositions}/>
                        { Object.entries(state.boxes).map(([key, box]) => (
                            <Box 
                                location={box.location} 
                                tileWidth={mapData.tilewidth} 
                                tileHeight={mapData.tileheight}
                                onDragged={handleDragged}
                                onReleased={(event) => handleBoxDragEnd(key, event) }
                                key={key} 
                            />
                        ))}
                    </>
                )}

            </Container>
            {/* {DEBUG_ACTIONQUEUE && (
                <div style={{ position: 'absolute', bottom: 0}}>
                    <h2>ActionQueue</h2>
                    <ul>
                        {scene.actionQueue.map((action) => (
                            <li key={JSON.stringify(action)}>{JSON.stringify(action)}</li>
                        ))}
                    </ul>
                </div>
            )} */}
        </>
    );
}

export default Scene;

export enum PlacementStatus {
    none, /* not over any rack */
    blocked, /* over a rack thats currently taken */
    free /* over a free rack */
}

const getTint = (placement: PlacementStatus) => {
    switch (placement) {
        case PlacementStatus.none:
            return 0xFFFFFF;
        case PlacementStatus.blocked:
            return 0xFF3300;
        case PlacementStatus.free:
            return 0x00FF00;        
    }
}

const setTint = (obj: PIXI.DisplayObject, tint: number) => {
    (((obj as PIXI.Container).children[0]! as PIXI.Graphics).children[0] as PIXI.Sprite).tint = tint; 
}