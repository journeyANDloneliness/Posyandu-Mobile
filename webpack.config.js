const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin");

const host  = 'localhost'
const port  = 8080
/*
    "@material-ui/core": "^4.12.3",
    "aphrodite": "^2.4.0",
    "cordova-android": "^9.1.0",
    "phaser": "^3.55.2",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-native": "^0.64.2",
    "react-native-elements": "^3.4.2",
    "react-native-safe-area-context": "^3.2.0",
    "react-native-vector-icons": "^8.1.0",
    "react-redux": "^7.2.4",*/
module.exports = {
	mode: 'development',
	entry: {
		app: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'www'),
		filename: "main.js"
		//pathinfo: false
	},
	devServer: {
		host,
		port,
		hot: true,
		disableHostCheck: true,
		clientLogLevel: 'silent',
		inline: true,
		contentBase: path.resolve(__dirname, 'src'),
		watchContentBase: true
	},
/*	optimization: {
    	//runtimeChunk: true
    	  removeAvailableModules: false,
    	removeEmptyChunks: false,
    	splitChunks: false,
    },*/
		/*optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},*/
	module: {
		rules: [
		  	{
			test: /\.(js|jsx)$/,
			include: path.resolve(__dirname, 'src'),
			exclude: /node_modules/,
			use: {
			  	loader: 'babel-loader',
			  	options: {
		         	cacheDirectory: true,
		          	cacheCompression: false,
		          	envName:  "development"
		        }
			}
		  },
		  {
			test: /\.html$/,
			use: [
			  {
				loader: 'html-loader',
				options: {  minimize: true }
			  }
			]
		  },
		  {
			test: /\.(png|svg|jpg|gif|pdf)$/,
			use: {
			  loader: 'file-loader',
			  options: {
				esModule: false
			  }
			}
		  },
		  {
			test: /\.scss$/,
			use: [
			  {
				loader: 'style-loader'
			  },
			  {
				loader: 'css-loader'
			  },
			  {
				loader: 'sass-loader'
			  }
			]
		  }
		]
	},
   	resolve: {
     	extensions: [".js", ".jsx"]
    },
  plugins: [
	new HtmlWebpackPlugin({
	  template: './src/index.html'
	}),
	new MiniCssExtractPlugin({
	  filename: '[name].css',
	  chunkFilename: '[id].css'
	})
  ]
}