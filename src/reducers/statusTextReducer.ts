export type StatusTextAction =
 | { type: 'setStatusText', text: string };


export const statusTextReducer = (state: string, action: StatusTextAction ) => {
  switch (action.type) {
    case 'setStatusText':
      return action.text;
    default:
      return state;
  }
}