import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import EslintPlugin from 'eslint-webpack-plugin';
import webpack, { Configuration } from 'webpack';
import DotenvWebpackPlugin from 'dotenv-webpack';
import { IBuildOptions } from './types/types';

export const buildPlugins = ({ mode, paths }: IBuildOptions): Configuration['plugins'] => {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new DotenvWebpackPlugin(),
        new HtmlWebpackPlugin({ template: paths.html }),
        new EslintPlugin({ extensions: ['ts'] }),
    ];

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            })
        );
    }

    return plugins;
};
