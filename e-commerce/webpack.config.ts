import webpack from 'webpack';

import path from 'path';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode, IBuildPaths } from './config/build/types/types';

interface IEnv {
    mode: BuildMode;
    port: number;
}

export default (env: IEnv) => {
    const paths: IBuildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        html: path.resolve(__dirname, 'src', 'index.html'),
    };
    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 5000,
        mode: env.mode ?? 'development',
        paths,
    });
    return config;
};
