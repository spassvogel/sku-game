import React, { useState } from 'react';
import { TiledMapData, TiledLayerData, TiledTilesetData } from 'constants/tiledMapData';
import { Container, Text } from '@inlet/react-pixi';
import { useEffect } from 'react';
import { SpritesheetData, SpriteData } from 'constants/spritesheetData';
import RectTileLayer from 'components/pixi/RectTileLayer';
import * as PIXI from 'pixi.js';

interface Props {
  basePath: string;
  data: TiledMapData;
  setRackLocations: (tiles: [number, number][]) => void;
  setDockLocations: (tiles: [number, number][]) => void;
  setWallLocations: (tiles: [number, number][]) => void;
}

const DEBUG = false;

const Tilemap = (props: Props) => {
  const {basePath, data, setRackLocations, setDockLocations, setWallLocations} = props;
  const [layers, setLayers] = useState<JSX.Element[]>();
  const [debug, setDebug] = useState<JSX.Element[]>();

  useEffect(() => {
    const spritesheetData = parseSpritesheetData(data);
    const tileset = getTileset(data);

    const texture = PIXI.Texture.from(`${basePath}/${tileset.image}`);
    const baseTexture = PIXI.BaseTexture.from(`${basePath}/${tileset.image}`);
    const spritesheet = new PIXI.Spritesheet(baseTexture, spritesheetData);
    const wallLocations: [number, number][] = [];

    spritesheet.parse(() => {
      // Rack tiles are marked on the tileset with property 'rack'
      const rackTileIds = tileset.tiles?.filter(tile => tile.properties?.some(p => p.name === 'rack' && p.value)).map(t => t.id);
      const dockTileIds = tileset.tiles?.filter(tile => tile.properties?.some(p => p.name === 'dock' && p.value)).map(t => t.id);
      const rackLocations: [number, number][] = [];
      const dockLocations: [number, number][] = [];
      const layers = data.layers.filter(layer => layer.visible).map(layer => {
        layer.data.forEach((id, index) => {
          if(rackTileIds && rackTileIds.some(rtId => rtId === id - tileset.firstgid)){
            const x = (index % layer.width);
            const y = Math.floor(index / layer.width);
            rackLocations.push([x, y]);  
          }

          if(dockTileIds && dockTileIds.some(rtId => rtId === id - tileset.firstgid)){
            const x = (index % layer.width);
            const y = Math.floor(index / layer.width);
            dockLocations.push([x, y]);  
          }
        })
 
        // walls are marked on the layer with property 'wall'
        if (layer.properties && layer.properties.some(p => p.name === 'wall' && p.value === true)){
          addAllTilesInLayerToList(wallLocations, layer, layer.width);
        }
        
        return createTileLayer(layer, texture, data.width, tileset, spritesheet);
      });
      setRackLocations(rackLocations);
      setDockLocations(dockLocations);
      setWallLocations(wallLocations);
      setLayers(layers);
      
      if (DEBUG){
        setDebug(getDebug(data.layers[0].data.length, data.layers[0].width, tileset.tilewidth, tileset.tileheight, rackLocations))
      }
    });

  }, [basePath, data, setRackLocations, setDockLocations, setWallLocations]);
  return (
    <Container >
      {layers}
      {debug}
    </Container>
  );
}

export default Tilemap;

const getDebug = (tileCount: number, columns: number, tileWidth: number, tileHeight: number, blockedTiles: number[][]) => {
  const elements = [];
  for (let i = 0 ; i < tileCount ; i++) {
    const location = [(i % columns),  Math.floor(i / columns)];
    const x = location[0] * tileWidth;
    const y = location[1] * tileHeight;
    var style = {
      font : 'bold italic 12px Arial',
      fill : '#F7EDCA',
      stroke : '#4a1850',
      strokeThickness : 2,
      wordWrap : true,
      wordWrapWidth : 440
    };
    // tile index
    elements.push(<Text key={`${x},${y}`} style={style} text={`${i}`} x={x} y={y} />);
    // // blocked
    // elements.push(<Graphics
    //   key={`blocked_${x},${y}`}
    //   x={x} y={y}
    //   draw={graphics => {
    //     const line = 3;
    //     const blocked = blockedTiles.some((loc) => loc[0] === location[0] && loc[1] === location[1]);
    //     const color = blocked ? 0xFF3300 : 0x00FF00;
    //     graphics.lineStyle(line, color);
    //     graphics.drawRect(line / 2, line / 2, tileWidth - line / 2, tileHeight - line / 2);
    //     graphics.endFill();
    //   }}
    // />)
  }
  return elements;
}

const getTileset = (mapData: TiledMapData) => {
  if (!mapData.tilesets.length) {
    throw new Error("No tilesets found! Can't continue");
  }
  if (mapData.tilesets.length > 1) {
    console.warn("Found more than one tileset. But we currently only support one.");
  }
  if (mapData.tilesets[0].source) {
    throw new Error("Please embed tilemaps in Tiled! Can't continue");
  }
  return mapData.tilesets[0];
}

const createTileLayer = (layer: TiledLayerData, texture: PIXI.Texture, horizontalTiles: number, tileset: TiledTilesetData, spritesheet: PIXI.Spritesheet) => {
  return (
    <RectTileLayer
      key={layer.name}
      texture={texture} 
      layer={layer} 
      horizontalTiles={horizontalTiles}
      tileset={tileset}
      spritesheet={spritesheet}
    />
  );
}

const parseSpritesheetData = (mapData: TiledMapData): SpritesheetData => {
  const tileset = getTileset(mapData);
  const columns = tileset.columns;

  const frames: { [name: string]: SpriteData } = {};
  for (let i = 0; i < tileset.tilecount; i++) {
    const w = tileset.tilewidth;
    const h = tileset.tileheight;
    const x = (i % columns) * w;
    const y = Math.floor(i / columns) * h;

    frames[`${tileset.name}-${i + 1}`] = { 
      frame: {x, y, w, h},
      spriteSourceSize: {x, y, w, h},
      rotated: false,
      trimmed: false,
      sourceSize: { w, h}
    };
  }
  const image = tileset.image;
  const size = { w: tileset.imagewidth, h: tileset.imageheight };
  return {
    frames,
    meta: {
      image,
      size,
      scale: 1
    }
  };
}

/** Add tiles in this layer to list */
const addAllTilesInLayerToList = (list: [number, number][], layer: TiledLayerData, columns: number) => {
  layer.data.reduce((acc: [number, number][], tile, index) => {
    if (tile > 0) {
      const x = (index % columns);
      const y = Math.floor(index / columns);
      acc.push([x, y]);  
    }
    return acc;
  }, list);
}