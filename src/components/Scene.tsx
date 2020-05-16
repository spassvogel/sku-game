import React, { useEffect, useState, useRef, useCallback } from "react";
import { Container, Stage } from '@inlet/react-pixi';
import { AStarFinder } from "astar-typescript";
import { TiledMapData } from 'constants/tiledMapData';
import Tilemap from './Tilemap';
import BridgedStage from "./pixi/util/BridgedStage";

import * as PIXI from 'pixi.js';
window.PIXI = PIXI;
// eslint-disable-next-line import/first
import 'pixi-tilemap'; // tilemap is not a real npm module :/

export interface Props {
    tilemap: string;
    width: number;
    height: number;
}

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 1000;

const Scene = (props: Props & React.ComponentProps<typeof Container>) => {
    const {tilemap, width, height, ...restProps} = props;
    const [mapData, setMapData] = useState<TiledMapData>();
    const [blockedTiles, setBlockedTiles] = useState<number[][]>([]);
    const ref = useRef<PIXI.Container>(null);

    const jsonPath = `${process.env.PUBLIC_URL}/${tilemap}`;

    useEffect(() => {
        new PIXI.Loader().add(jsonPath).load((loader)=>{            
            const mapData: TiledMapData = loader.resources[jsonPath].data;
            setMapData(mapData);
        });
    }, [jsonPath]);

    const basePath = jsonPath.substr(0, jsonPath.lastIndexOf('/'));

    /** Returns true if the tile is blocked */
    const locationIsBlocked = useCallback((location: [number, number]) => {
        return blockedTiles.some((l) => l[0] === location[0] && l[1] === location[1]);
    }, [blockedTiles]);

    return (
        <>
            <Container 
                ref={ref}
                interactive={true}
                hitArea={new PIXI.RoundedRectangle(0, 0, width, height, 0)}
                {...restProps}
            >
                { mapData && (
                    <Tilemap basePath={basePath} data={mapData} setBlockedTiles={setBlockedTiles}/>
                )}
                {/* { mapData && scene.actors.map((a) => (
                    <SceneActor
                        key={a.name}
                        actor={a.name}
                        questName={props.questName}
                        tileWidth={mapData.tilewidth}
                        tileHeight={mapData.tilewidth}
                        location={a.location}
                    >
                        {selectedActor?.name === a.name && (<Graphics
                            name="selectioncircle"
                            draw={graphics => {
                                const line = 3;
                                graphics.lineStyle(line, 0xFFFFFF);
                                graphics.drawCircle(mapData.tilewidth / 2, mapData.tileheight / 2, mapData.tilewidth / 2 - line);
                                graphics.endFill();
                            }}
                        />)}
                        <Sprite                     
                            y={-80}
                            image={`${process.env.PUBLIC_URL}/img/scene/actors/wizard.png`} 
                            interactive={true}
                            pointerdown={() => handleActorStartDrag(a)}
                            pointerup={handleCancelAction}
                            pointerupoutside={handleActorEndDrag}
                        />

                    </SceneActor>
                ))} */}
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
