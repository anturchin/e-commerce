import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildResolvers } from './buildResolvers';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { IBuildOptions } from './types/types';

export const buildWebpack = (options: IBuildOptions): webpack.Configuration => {
    const { mode, paths } = options;
    const isDev = mode === 'development';
    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(),
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? buildDevServer(options) : undefined,
        watchOptions: {
            poll: 1000,
        },
    };
};
