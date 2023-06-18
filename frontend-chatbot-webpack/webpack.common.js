const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer')

module.exports = {
    entry: {
        popup: path.resolve('src/popup/index.tsx'),
        background: path.resolve('src/background/background.ts'),
        contentScript: path.resolve('src/contentScript/index.tsx'),
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    // {
                    //     loader: 'postcss-loader', // postcss loader needed for tailwindcss
                    //     options: {
                    //         postcssOptions: {
                    //             ident: 'postcss',
                    //             plugins: [autoprefixer],
                    //             plugins: [tailwindcss, autoprefixer],
                    //         },
                    //     },
                    // },
                ],
            },
            {
                type: 'asset/resource',
                test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/,
            },
            {
                test: /\.(jpg|png|jpeg|svg)$/,
                use: {
                  loader: 'url-loader',
                },
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                },
            },
        ]
    },
    "plugins": [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new CopyPlugin({
            patterns: [
            {
                from: path.resolve('src/static'),
                to: path.resolve('dist')
            },
            {
                from: path.resolve('src/assets'),
                to: path.resolve('dist/assets')
            }
        ]
        }),
        ...getHtmlPlugins([
            'popup',
        ])
    ],
    resolve: {
        extensions: ['.tsx', '.js', '.ts']
    },
    output: {
        publicPath: '',
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            chunks(chunk){
                return chunk.name !== 'contentScript'
            }
        }
    }
}

function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HtmlPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk]
    }))
}