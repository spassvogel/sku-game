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
    back?: boolean;
    onDragged?: (event: PIXI.interaction.InteractionEvent) => void;
    onReleased?: (event: PIXI.interaction.InteractionEvent) => void;
    delay?: number; // Wait this long before showing
}


const Box = (props: Props & React.ComponentProps<typeof Container>) => {
    const {
        location = [0, 0],
        tileWidth = 0, 
        tileHeight = 0,
    } = props;
    const ref = useRef<PIXI.Container>(null);
    const offset = useRef<PIXI.Point>();
    const data = useRef<PIXI.interaction.InteractionData>();
    //const [position, setPosition] = useState<PIXI.Point>(props.position || new PIXI.Point());

    const {x, y} = useMemo(() => {
        return { 
            x: location[0] * tileWidth,
            y: location[1] * tileHeight,
        };
    }, [location, tileWidth, tileHeight]);
    
    // useEffect(() => {
    //     // Pop in animation!
    //     gsap.from(ref.current, { 
    //       duration: 1,
    //       ease: "elastic.out(2, 0.5)",
    //       pixi: { 
    //         visible: false,
    //         scale: .1, 
    //       }
    //     }).delay(props.delay || 0);
    // }, [props.delay]);

    const onDragStart = (event: PIXI.interaction.InteractionEvent) => {
        data.current = event.data;
        event.currentTarget.zIndex = 2;
        event.stopPropagation(); 
        offset.current = data.current.getLocalPosition(ref.current!);
    }
    
    const onDragEnd = (event: PIXI.interaction.InteractionEvent) => {
        event.currentTarget.zIndex = 1;
        if (props.onReleased) props.onReleased(event);
        data.current = undefined;
    }
    
    const onDragMove = (event: PIXI.interaction.InteractionEvent) => {
        if (data.current && ref.current){
            const parentPos = data.current.getLocalPosition(ref.current!.parent);
            const position = new PIXI.Point(parentPos.x - offset.current!.x, parentPos.y - offset.current!.y);
            ref.current!.position = position;
            //setPosition(position);
            if (props.onDragged)
                props.onDragged(event);
        }
    }

    const img = `${process.env.PUBLIC_URL}/images/box1${props.back ? 'b'  : ''}.png`;
    //const tint = getTint(placement);

    return (
        <Container
            { ...props }
            x={x}
            y={y}
            interactive={true}
            ref={ref}
            mousedown={onDragStart}
            touchstart={onDragStart}
            mouseup={onDragEnd}
            mouseupoutside={onDragEnd}
            mousemove={onDragMove}
            touchmove={onDragMove}
        >
            <Graphics draw={(graphics:PIXI.Graphics) => {
                const line = 3;
//                 const blocked = blockedTiles.some((loc) => loc[0] === location[0] && loc[1] === location[1]);
                // const color = blocked ? 0xFF3300 : 0x00FF00;
                const color = 0xFF3300;
                graphics.lineStyle(line, color);
                graphics.drawRect(line / 2, line / 2, tileWidth - line / 2, tileHeight - line / 2);
                graphics.endFill();
            }}>
            <Sprite 
                anchor={[0, -0.5]}
                image={img}
                // tint={tint}
            />              
            </Graphics>
        </Container>
    );
}

export default Box;

