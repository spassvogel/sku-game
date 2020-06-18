
export enum GameState {
  intro,
  placingBoxes,
  pickingBoxes,
  complete,
}

export type GameStateAction =
 | { type: 'startGame'}
 | { type: 'startPicking' }
 | { type: 'completeGame' }
 | { type: 'restart' };

export const gameStateReducer = (state: GameState, action: GameStateAction ) => {
  switch (action.type) {
    case 'startGame':
      return GameState.placingBoxes;
    case 'startPicking':
      return GameState.pickingBoxes;
    case 'completeGame':
      return GameState.complete;
    case 'restart':
      return GameState.placingBoxes;
    default:
      return state;
  }
}