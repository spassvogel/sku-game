import React, { useRef,  useMemo } from 'react';
import { Sprite, Graphics, Container } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { PixiPlugin } from 'gsap/all';
import { gsap } from 'gsap'

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);

interface Props {
  position?: PIXI.Point;
  location?: [number, number];
  tileWidth: number;
  tileHeight: number;
  selected: boolean;
  behindWall?: boolean;
  onClick?: (event: PIXI.interaction.InteractionEvent) => void;
  onDragged?: (event: PIXI.interaction.InteractionEvent) => void;
  onReleased?: (event: PIXI.interaction.InteractionEvent) => void;
  delay?: number; // Wait this long before showing
}


const Box = (props: Props & React.ComponentProps<typeof Container>) => {
  const {
    location = [0, 0],
    tileWidth = 0, 
    tileHeight = 0,
    behindWall,
    selected
  } = props;
  const ref = useRef<PIXI.Container>(null);
  const imgRef = useRef<PIXI.Sprite>(null);
  const dragRef = useRef<PIXI.Sprite>(null);
  const offset = useRef<PIXI.Point>();
  const data = useRef<PIXI.interaction.InteractionData>();

  const {x, y} = useMemo(() => {
    return { 
      x: location[0] * tileWidth,
      y: location[1] * tileHeight,
    };
  }, [location, tileWidth, tileHeight]);
  
  const onDragStart = (event: PIXI.interaction.InteractionEvent) => {
    data.current = event.data;
    event.currentTarget.zIndex = 4;
    event.stopPropagation(); 
    if (props.onClick) props.onClick(event);

    offset.current = data.current.getLocalPosition(ref.current!);

    imgRef.current!.visible = false;
    dragRef.current!.visible = true;
  }
  
  const onDragEnd = (event: PIXI.interaction.InteractionEvent) => {
    if (props.behindWall) {
      event.currentTarget.zIndex = 3;
    } else {
      event.currentTarget.zIndex = 1;
    }
    data.current = undefined;

    if (props.onReleased) props.onReleased(event);
    imgRef.current!.visible = true;
    dragRef.current!.visible = false;

  }
  
  const onDragMove = (event: PIXI.interaction.InteractionEvent) => {
    if (data.current && ref.current){
      const parentPos = data.current.getLocalPosition(ref.current!.parent);
      const position = new PIXI.Point(parentPos.x - offset.current!.x, parentPos.y - offset.current!.y);

      ref.current!.position = position;
      if (props.onDragged) props.onDragged(event);
    }
  }

  const img = `${process.env.PUBLIC_URL}/images/box1${ props.behindWall ? 'b' : ''}.png`;

  return (
    <Container
      { ...props }
      x={x}
      y={y}
      ref={ref}
      zIndex={(props.behindWall) ? 3 : 1} // boxes in front: 1, guy: 2, boxes in back: 3
      mousedown={onDragStart}
      touchstart={onDragStart}
      mouseup={onDragEnd}
      mouseupoutside={onDragEnd}
      mousemove={onDragMove}
      touchmove={onDragMove}
    >
      {selected && (<Graphics draw={(graphics:PIXI.Graphics) => {
          const line = 2;
          const color = 0xffcc00;
          graphics.clear();
          graphics.lineStyle(line, color);
          if (behindWall && !data.current) {
            graphics.drawRect(2, tileHeight / 2 - 1, tileWidth - 4, tileHeight / 2 + 2 );
          }
          else {
            graphics.drawRect(2, -tileHeight / 2 - 1, tileWidth - 4, tileHeight + 2 );
          }
          graphics.endFill();
        }}
      />)}
      <Sprite 
        anchor={behindWall ? [0, -0.5] : [0, 0.5]}
        image={img}
        ref={imgRef}
      />        
      <Sprite 
        name="ghost"
        anchor={behindWall ? [0, -0.5] : [0, 0.5]}
        alpha={0.9}
        image={`${process.env.PUBLIC_URL}/images/box1.png`}
        ref={dragRef}
        visible={false}
      />        
      {/* </Graphics> */}
    </Container>
  );
}

export default Box;

