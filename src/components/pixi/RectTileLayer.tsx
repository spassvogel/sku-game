import { PixiComponent } from "@inlet/react-pixi";
import * as PIXI  from 'pixi.js';
import { TiledLayerData, TiledTilesetData } from 'constants/tiledMapData';

window.PIXI = PIXI;

interface Props  {
  texture: PIXI.Texture;
  horizontalTiles: number;
  layer: TiledLayerData;
  tileset: TiledTilesetData;
  spritesheet: PIXI.Spritesheet;
};

const RectTileLayer = PixiComponent<Props, any>("RectTileLayer", {
  create(props: Props) {    
    require('pixi-tilemap');    
    var tileLayer = new window.PIXI.tilemap.CompositeRectTileLayer(0, [props.texture]);
    return tileLayer;
  },

  applyProps(instance, oldProps: Props, props: Props) {
    const {layer, tileset, horizontalTiles,spritesheet} = props;
    if (!layer.data) {
      return;
    }
    for (let i = 0; i < layer.data.length; i++) {
      const w = tileset.tilewidth;
      const h = tileset.tileheight;
      const x = (i % horizontalTiles) * w;
      const y = Math.floor(i / horizontalTiles) * h;
    
      if (layer.data[i] > 0) {
        const spriteId = `${tileset.name}-${layer.data[i]}`;
        instance.addFrame(spritesheet.textures[spriteId], x, y);
      }
    }
  }
});

export default RectTileLayer;

