# UXP plugin sample : simple rust wasm

This UXP plugin inverts the colors of the selected layer. It uses wasm written in rust for implementation.

このUXPプラグインは選択レイヤーのカラーを反転します。実装にはrustで記述したwasmを使用しています。

## ## Limitations

Works only on Windows. It has not been tested on Mac, but it is said that Photoshop crashes.

Windowsのみで動きます。Macでは試していませんが、Photoshopがクラッシュするそうです。

## install 

In an environment with the Adobe Creative Cloud app, download the following ccx file and double-click to install.

CCアプリのある環境で、以下のccxファイルをダウンロードし、ダブルクリックすればインストールされます。

[harayoki.uxp_asm_sample_PS_v1_0_0.ccx](release%2Fharayoki.uxp_asm_sample_PS_v1_0_0.ccx)

## usage

Photoshop menu -> plugins -> Invert Colors -> Invert Colors (WASM)

## for developer

For more details, please refer to the following. Although there are some differences in the details, 
the steps to get it working are the same.

詳しくは以下を見てください。細かい部分は違いますが、動作までの手順は同じです。

https://github.com/AdobeDocs/uxp-photoshop-plugin-samples/tree/main/wasm-rust-sample



