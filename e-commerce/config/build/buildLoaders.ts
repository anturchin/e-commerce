import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { IBuildOptions } from './types/types';

export const buildLoaders = ({ mode }: IBuildOptions): ModuleOptions['rules'] => {
    const isDev = mode === 'development';

    const fontsLoader = {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
            filename: 'fonts/[name].[ext]',
        },
    };

    const assetLoader = {
        test: /\.(png|svg|webp|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
            filename: 'images/[name].[ext]',
        },
    };
    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    };
    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };
    const htmlLoader = {
        test: /\.html$/i,
        loader: 'html-loader',
    };
    return [scssLoader, tsLoader, htmlLoader, assetLoader, fontsLoader];
};
