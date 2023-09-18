import path from 'path';

export default {
  mode: 'development',
  entry: ["./app.js"],
  output: {
      filename: 'bundle.js',
  },
  optimization: {
      usedExports: true, 
  },
}