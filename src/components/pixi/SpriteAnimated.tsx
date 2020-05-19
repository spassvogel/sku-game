import { PixiComponent, applyDefaultProps, AnimatedSprite } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

export default PixiComponent<React.ComponentProps<typeof AnimatedSprite>, PIXI.AnimatedSprite>('SpriteAnimated', {
  create: ({ textures }) => {
    const animatedSprite = new PIXI.AnimatedSprite(textures || [], true);
    return animatedSprite;
  },
  applyProps: (instance, oldProps, newProps) => {
    applyDefaultProps(instance, oldProps, newProps);
    instance.gotoAndPlay(0);
  },
});


