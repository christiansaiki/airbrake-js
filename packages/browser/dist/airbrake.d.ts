export declare class Notifier {
  constructor(opt: IOptions);
  public addFilter(filter: Filter): void;
  public notify(err: any): Promise<INotice>;
  public wrap(fn: any): IFuncWrapper;
  public call(fn: any, ...args: any[]): any;
  public onerror(): void;
}

interface IInstrumentationOptions {
  onerror?: boolean;
  fetch?: boolean;
  history?: boolean;
  console?: boolean;
  xhr?: boolean;
}

export interface IOptions {
  projectId: number;
  projectKey: string;
  environment?: string;
  host?: string;
  timeout?: number;
  keysBlacklist?: any[];
  processor?: Processor;
  reporter?: Reporter;
  instrumentation?: IInstrumentationOptions;

  request?: request.RequestAPI<
    request.Request,
    request.CoreOptions,
    request.RequiredUriUrl
  >;
}

interface IFuncWrapper {
  (): any;
  inner: () => any;
}

type Filter = (notice: INotice) => INotice | null;

interface INotice {
  id: string;
  errors: IAirbrakeError[];
  context: any;
  params: any;
  session: any;
  environment: any;
}

interface IAirbrakeFrame {
  function: string;
  file: string;
  line: number;
  column: number;
}

interface IAirbrakeError {
  type: string;
  message: string;
  backtrace: IAirbrakeFrame[];
}
