import type { MetaFunction as RouterMetaFunction } from 'react-router';

export namespace Route {
  export interface Params {
    productId: string;
  }

  export interface LoaderData {
    // Add loader data types here if needed
  }

  export interface ActionData {
    // Add action data types here if needed
  }

  export interface ComponentProps {
    params: Params;
    loaderData?: LoaderData;
    actionData?: ActionData;
  }

  export type MetaFunction = RouterMetaFunction;
}
