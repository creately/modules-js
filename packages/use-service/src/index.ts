import once from 'lodash.once';

import 'reflect-metadata';
import { ValueProvider, FactoryProvider, ClassProvider, container } from 'tsyringe';

/**
 * This module resolves singletons by default.
 */
export { singleton as injectable } from 'tsyringe';

/**
 * Using the tsyringe inject as it is for now.
 */
export { inject } from 'tsyringe';

/**
 * Only a subset of tsyringe provider types are supported at the moment. This is done
 * so that this module can replace tsyringe with an alternative if needed.
 */
export type Provider = ValueProvider<any> | FactoryProvider<any> | ClassProvider<any>;

/**
 * Register providers on the global tsyringe container. This is required to resolve
 * singleton classes. We may need to use a separate container instance soon. Check
 * https://github.com/microsoft/tsyringe#instancecachingfactory for an alternative.
 */
export function provide(token: string, provider: Provider) {
  if ((provider as any).useFactory) {
    (provider as any).useFactory = once((provider as any).useFactory);
  }
  container.register(token, provider as any);
}

/**
 * Use this to get instances out of containers.
 */
export function useService<T>(token: string): T {
  return container.resolve(token);
}

/**
 * Resets all tokens, can be used in unit tests.
 */
export function _reset() {
  container.reset();
}
