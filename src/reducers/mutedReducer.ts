export type MutedReducerAction =
 | { type: 'setMuted', value: boolean };


export const mutedReducer = (state: boolean, action: MutedReducerAction ) => {
  switch (action.type) {
    case 'setMuted':
      localStorage.setItem('muted', action.value ? 'true' : 'false');
      return action.value;
    default:
      return state;
  }
}