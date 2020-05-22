import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { useApp, useTick, Container } from "@inlet/react-pixi";
import * as PIXI from 'pixi.js';
import SpriteAnimated from './SpriteAnimated';

export enum Orientation {
  front = 'front',
  left = 'left',
  right = 'right',
  back = 'back',
}

interface Props {
  atlas: string;
  carryBox: boolean;
}

//
const Guy = forwardRef<PIXI.Container, any>((props: Props & React.ComponentProps<typeof Container>, ref) => {
  const {
    atlas,
    carryBox,
    ...containerProps
  } = props;

  const [frames, setFrames] = useState<{ [key: string]: PIXI.Texture[]}|null>(null);

  const [orientation, setOrientation] = useState<Orientation>(Orientation.right);
  const app = useApp();
  const lastPositionPoint = useRef<PIXI.Point>();
  //const orientation = useRef<Orientation>();

  useTick(() => {
    if (!ref || !(ref as any).current) return;
    const currentPosition = (ref as any).current.position as PIXI.Point;
    const lastPosition = lastPositionPoint.current;
    if (lastPosition && !lastPosition.equals(currentPosition)) {
      const angle: number = Math.atan2(currentPosition.y - lastPosition.y, currentPosition.x - lastPosition.x);
      if ((angle >= Math.PI / -4 && angle <= 0) || (angle >= 0 && angle <= Math.PI / 4)) {
        // going right
        setOrientation(Orientation.right);     
      }
      else if (angle >= Math.PI / 4 && angle <= Math.PI * .75) {
        // going down
        setOrientation(Orientation.front);
      }
      else if (angle > Math.PI * .75 || angle < Math.PI * -0.75){
        // going left
        setOrientation(Orientation.left);
      } else {
        // Going up
        setOrientation(Orientation.back);
      }
    }
    lastPositionPoint.current = currentPosition.clone();
  });

  useEffect(() => {
    const loadingComplete = () => {
      const allFrames = app.loader.resources[atlas].data.frames;
      console.log(`${props.name} frames: ${allFrames}!`)
      const indexedTextures = Object.keys(allFrames).reduce((acc: any, frame: string) => {
        // frames are in the format of: 'front1', 'front2', 'left-box1' etc
        // create a mapping keyed by the part without the number
        const animation = frame.substring(0, frame.length - 1);
        if (!acc[animation]) {
          acc[animation] = [];
        }
        acc[animation].push(PIXI.Texture.from(frame));
        return acc;
      }, {});

      setFrames(indexedTextures);
      console.log(`${props.name} complete!`)
    }

    app.loader.onComplete.once(loadingComplete);
    if (!app.loader.loading) {
      app.loader.add(atlas).load();
    }
    
  }, [app.loader, app.loader.loading, atlas, props.name]);

  if (!frames) return null;
  const animationFrames = frames[`${orientation}${carryBox ? '-box': ''}`];
  return (
    <Container 
      ref={ref}
      zIndex={2}
      { ...containerProps}
    >
      <SpriteAnimated
        animationSpeed={0.15}
        isPlaying={true}
        textures={animationFrames}
        anchor={[0, 0.1]}
      />
    </Container>
  )
});

// const areEqual = (a: React.ComponentProps<typeof Container>, b: React.ComponentProps<typeof Container>) => {
//   return true;
// }
// export default memo(Guy, () => (true));
export default Guy;
