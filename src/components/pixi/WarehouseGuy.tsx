import React, { useState, useEffect, useRef, memo } from 'react';
import * as PIXI from 'pixi.js';
import Guy from './Guy';
import { AnyAction } from 'components/context/AppProvider';
import { AStarFinder } from 'astar-typescript';
import { PickingList } from 'reducers/pickingListsReducer';
import { gsap, Linear } from 'gsap'
import { PixiPlugin } from 'gsap/all';
import { SPEED_MULTIPLIER } from 'constants/gameSettings';

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);

interface Props {
  pickingList?: PickingList;
  homeLocation: [number, number];
  dispatch: React.Dispatch<AnyAction>;
  aStar: AStarFinder;
  getProductLocation: (productCode: string) => { location: [number, number], far: boolean }
}

const convertLocation = (location: [number, number]) => {
  // This is the format AStarFind works with
  return { x: location[0], y: location[1] }
}
//
const WarehouseGuy = (props: Props & React.ComponentProps<typeof Guy>) => {
  const {
    dispatch,
    pickingList,
    aStar,
    homeLocation,
    tileSize,
    getProductLocation,
    ...guyProps
  } = props;

  const guyRef = useRef(null);
  const [carryBox, setCarryBox] = useState<boolean>(false);

  const lastLocation = useRef<[number, number]>(homeLocation); // aStar has to know where this guy starts from
  const currentDestination = useRef<string>();
  
  useEffect(() => {
    if (!guyRef.current || !pickingList) return;

    const { orderNo, products } = pickingList;
    
    //console.log(`[${props.name}] picking list: `, pickingList.products.find(value => !pickedProducts.includes(value)) )
   
    const productCode = products.find(value => !(pickingList.pickedProducts || []).includes(value));

    const destination = (productCode || 'home');
    if (currentDestination.current && (currentDestination.current === destination)) {
      // if (destination === 'home') console.log(`[${props.name}] was already underway to ${destination} ${productCode} ${currentDestination.current}`)
      // todo: this is to prevent the guy from starting another animation when another guy picks up a boxes
      // Would be better to useMemo or something but cba now
      return;
    }
    currentDestination.current = productCode || destination;

    gsap.killTweensOf(guyRef.current);
    const tl = gsap.timeline();
    const pathStartLocation = convertLocation(lastLocation.current || homeLocation);

    if (productCode) {
      // There is a product to pick, go fetch it
      
      // Determine the path to this product
      const {location, far} = getProductLocation(productCode);
      // console.log(`[${props.name}] We need to pick ${productCode} (${orderNo}). It's location is ${location}. It's${far ? "" : " not"} far. We start at ${pathStartLocation.x}, ${pathStartLocation.y}}`);

      const path = aStar?.findPath(pathStartLocation, convertLocation(location)) || [];
      // create animation to walk this path
      path.forEach((loc: number[]) => {
        tl.to(guyRef.current, {
          ease: Linear.easeNone,
          pixi: { 
            x: loc[0] * tileSize,
            y: loc[1] * tileSize
          }, 
          duration: 1 / SPEED_MULTIPLIER + (far ? .035 : 0)  // it takes one second real time to walk one tile
        });
      }); 
      tl.to(guyRef.current, {
        delay: far ? .2 : 0, // We cheat a bit to make the difference bigger. Taking a box from a 'far' location takes half a second longer
        onComplete: () => { 
          // completed picking product
          setCarryBox(true);
          dispatch({ type: 'completeProductPick', productCode, orderNo});
          //console.log(`[${props.name}] completed picking ${productCode} (${orderNo})`)
          const endLocation = path[path.length - 1];
          lastLocation.current = endLocation as [number, number];
        },
      })
    } 
    else {
      // All done with this order, return home
      // console.log(`[${props.name}] I guess we are done. Time to return to ${homeLocation}`);
        
      // Determine the path home
      const path = aStar?.findPath(pathStartLocation, convertLocation(homeLocation)) || [];
      
      // create animation to walk this path
      path.forEach((loc: number[]) => {
        tl.to(guyRef.current, {
          ease: Linear.easeNone,
          pixi: { 
            x: loc[0] * tileSize,
            y: loc[1] * tileSize
          }, 
          duration: 1 / SPEED_MULTIPLIER
        });
      }); 
      tl.to(guyRef.current, {
        onComplete: () => { 
          // completed picking product
          setCarryBox(false);
          lastLocation.current = homeLocation;
          dispatch({ type: 'completeOrder', orderNo });
        },
      })
    }    
  }, [aStar, dispatch, getProductLocation, homeLocation, pickingList, tileSize, props.name]);
  
  return (
    <Guy
      atlas={`${process.env.PUBLIC_URL}/images/sprites/guy/guy.json`} 
      x={homeLocation[0] * tileSize} 
      y={homeLocation[1] * tileSize}
      carryBox={carryBox}
      {...guyProps} 
      ref={guyRef} 
    />
  )
};

// const areEqual = (a: React.ComponentProps<typeof Container>, b: React.ComponentProps<typeof Container>) => {
//   return true;
// }
export default memo(WarehouseGuy);
