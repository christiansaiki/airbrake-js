import { Notifier } from '../notifier';

export function patch(createDebug, airbrake: Notifier) {
  const oldInit = createDebug.init;
  createDebug.init = function(debug) {
    oldInit.apply(this, arguments);

    const oldLog = debug.log || createDebug.log;
    debug.log = function abCreateDebug() {
      airbrake.scope().pushHistory({
        type: 'log',
        arguments: arguments,
      });
      return oldLog.apply(this, arguments);
    };
  };
}
