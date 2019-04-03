/**
 * Created by Administrator on 2019/3/30.
 */
const path = require('path');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');//������� css
const HtmlWebpackPlugin = require('html-webpack-plugin');  //���html

//��װ������������html�ļ�
var getHtmlConfig= function (name) {
    return{
        template: './src/view/'+name+'.html',
        filename:'view/'+name+'.html',
        inject:true,
        hash:true
    };
};

module.exports={
    entry: {
        'index':'./src/page/index/index.js',
        'login':'./src/page/login/index.js'
    },
    output:{
        filename:'./[name]-main.js',
        path:path.resolve(__dirname,'dist'),
    },
    externals : {
        'jquery' : 'window.jQuery'
    },

    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:''
                        }
                    },
                    'css-loader',
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath:'./'
                        }
                    }
                ]
            }

        ]
    },
    //�����������ģ��
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },
    devServer: {
         contentBase: './dist'
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:"[name]-main.css",
            chunkFilename:"[id].css"
        }),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
  ]
};

