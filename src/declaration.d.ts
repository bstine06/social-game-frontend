declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }

  declare module '*.mp3' {
    const src: string;
    export default src;
  }

  declare module '*.png' {
    const value: string;
    export default value;
  }

  declare module '*.otf';