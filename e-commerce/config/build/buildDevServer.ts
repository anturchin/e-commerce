import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { IBuildOptions } from './types/types';

export const buildDevServer = (options: IBuildOptions): DevServerConfiguration => {
    return {
        compress: false,
        host: '0.0.0.0',
        port: options.port ?? 5000,
        open: true,
    };
};
