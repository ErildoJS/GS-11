module.exports = {
  presets: [
    '@babel/preset-env',//transforma o novo no antigo dependente do ambiente
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
}