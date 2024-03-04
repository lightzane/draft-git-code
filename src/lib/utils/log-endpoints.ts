import path from 'path';
import { Logger } from 'winston';

/**
 * Prints all the registered endpoint.
 * Should be put at the bottom of the page after all endpoints are defined.
 *
 * @usage
 * ```ts
 * const router = express.Router()
 * const logger = Logger('MyRoute')
 * LogEndpoints(logger, router.stack)
 *
 * // It will execute the following:
 * router.stack.forEach((s) => {
 * const route = s.route;
 * const endpoint = route.path;
 * const method = Object.keys(route.methods)[0].toUpperCase();
 * const filename = path.parse(module.filename).name;
 * logger.debug(`Mapped ${method} /${filename}${endpoint}`);
 * });
 * ```
 */
export function LogEndpoints(module: NodeModule, logger: Logger, stack: any[]) {
  stack.forEach((s) => {
    const route = s.route;
    const endpoint = route.path;
    const method = Object.keys(route.methods)[0].toUpperCase();
    const filename = path.parse(module.filename).name.replace(/\.route$/, '');
    logger.debug(`Mapped ${method} /${filename}${endpoint}`);
  });
}
