import { Configuration } from 'webpack';

export const buildResolvers = (): Configuration['resolve'] => {
    return {
        extensions: ['.tsx', '.ts', '.js'],
    };
};
