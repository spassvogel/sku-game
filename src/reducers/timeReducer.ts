export type TimeReducerAction =
 | { type: 'tick', start: number };


export const timeReducer = (state: number, action: TimeReducerAction ) => {
  switch (action.type) {
    case 'tick':
      return (performance.now() - action.start);
    default:
      return state;
  }
}