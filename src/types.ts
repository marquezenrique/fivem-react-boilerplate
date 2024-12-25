export interface NuiVisibilityFrame {
  setVisible: (visible: boolean) => void;
  visible: boolean;
}

export interface NuiMessageDataFrame<T = any> {
  action: string;
  data: T;
}

export interface NuiDebugEventFrame {
  action: string;
  data: any;
}
