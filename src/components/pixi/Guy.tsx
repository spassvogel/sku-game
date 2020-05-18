

import React, { useState, useEffect } from 'react';
import { Sprite, AnimatedSprite, useApp } from "@inlet/react-pixi";
import * as PIXI from 'pixi.js';

// // defaulting to the 4 frame idle animation
// let animationName = 'idle'
// let frameNumber = 0
// let acc = 0 // a variable that stores time
// let maxFrame = 4
// let frameDelay = 0.5

// update(delta) {
//     // accumulate time
//     acc += delta 
//     // is it time for next frame?
//     if (acc > frameDelay) {
//         // next frame
//         frameNumber++
//         if (frameNumber > maxFrame) {
//            // loop to start of the animation
//            frameNumber = 0
//         }
//         // change the graphics
//         sprite.texture = PIXI.Texture.fromFrame(animationName + '_' + frameNumber + '.png')
//     }    
// }

// // change to the run animation
// run() {
//   animationName = 'run'
//   acc = 0
//   frameNumber = 0
//   maxFrame = 8
//   frameDelay = 0.250
// }

// // change to the attack animation
// attack() {
//   animationName = 'attack'
//   acc = 0
//   frameNumber = 0
//   maxFrame = 12
//   frameDelay = 0.180
// }

export enum Orientation {
    front = 'front',
    left = 'left',
    right = 'right',
    back = 'back',
}

interface Props {
    atlas: string;
    orientation?: Orientation; 
    x: number;
    y: number;
}


const Guy = (props: Props ) => {
    const {
        atlas,
        x,
        y
        // ...restProps
    } = props;

    const [frames, setFrames] = useState<{ [key in Orientation]: PIXI.Texture[]}|null>(null);
    const app = useApp();

    useEffect(() => {
        app.loader.add(atlas).load((_, resource) => {
            const allFrames = resource[atlas]!.data.frames;
            const indexedTextures = Object.keys(allFrames).reduce((acc: any, frame: string) => {
                // frames are in the format of: 'front1', 'front2' etc
                // create a mapping keyed by `orientation`
                const frameName = frame.substring(0, frame.length - 1);
                const orientation = frameName as Orientation;
                if (!acc[orientation]) {
                    acc[orientation] = [];
                }
                acc[orientation].push(PIXI.Texture.from(frame));
                return acc;
            }, {});

            setFrames(indexedTextures);
        });
      }, [app.loader, atlas]);


    if (!frames) return null;
    return (
        <AnimatedSprite
            animationSpeed={0.15}
            isPlaying={true}
            textures={frames[Orientation.right]}
            anchor={0.5}
            x={x}
            y={y}
        />
        // null
    )
}

export default Guy;
