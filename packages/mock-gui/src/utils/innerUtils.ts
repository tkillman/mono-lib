import { RequestHandler } from 'msw';

export const cloneHandlerWithResolver = (
  handler: RequestHandler,
  newResolver: RequestHandler['resolver']
): RequestHandler => {
  return Object.assign(Object.create(Object.getPrototypeOf(handler)), {
    ...handler,
    resolver: newResolver,
  });
};
