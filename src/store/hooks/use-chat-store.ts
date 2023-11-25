import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { IAction, initialState, reducer } from "../flux";
import { IMessageProps } from "../../pages/Chat/Components/Message";
import { IContactItemProps } from "../../pages/Chat/Components/ContactList/ContactListItem";

export interface IUser { 
  id: string;
  uid: string;
  photoURL: string;
  email: string;
  displayName: string;
}
export type IThemeType = {
  type: 'dark' | 'light' | 'green' | 'blue' | 'purple' | 'red' | 'yellow' | 'pink'
}

export interface ThemeType { 
  type: IThemeType,
  styles: {
    gradient: string,
    background: string,
  }
}
export interface IState { 
  user?: IUser;
  selectedContact?: IUser;
  messages: IMessageProps[];  
  contactList: IContactItemProps[];
  theme: ThemeType
}

const useChatStore = (set : any) => ({
  ...initialState,
  dispatch: ({ type, payload } : IAction) => set(
    (state : IState) => reducer(state, { type, payload }),
    true,
    {
      type: type, 
      payload: payload,
    }
  ),  
});

export const useChat = create(devtools(useChatStore))

