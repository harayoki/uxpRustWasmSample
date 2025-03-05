import { host, entrypoints } from 'uxp';
import { app, core, imaging } from 'photoshop';
import { decodeWebAssembly } from './utils';
import encodedRust from '../wasm/uxp.wasm';
import init, { invert_colors } from '../pkg/uxp_wasm.js';

//console.log("Host:", host);
//console.log("Entrypoints:", entrypoints);
//console.log("app:", app);
//console.log("core:", core);
//console.log("decodeWebAssembly:", decodeWebAssembly);
//console.log("encodedRust:", encodedRust);


entrypoints.setup({
     commands: {
        invert_with_wasm,
        invert_without_wasm,
     }
});

const decodedRust = decodeWebAssembly(encodedRust);
await init(decodedRust);


async function invertLayer(use_wasm=true) {

    const doc = app.activeDocument;
    const layers = doc.activeLayers; // 選択レイヤーを取得

    if (layers.length === 0) {
        console.log("No valid layer selected.");
        return;
    }
    const layer = layers[0];

    core.executeAsModal(async () => {
        const imageObj = await imaging.getPixels({
            layerID: layer.id,
        });
        const hasAlpha = imageObj.imageData.hasAlpha;
        const components = imageObj.imageData.components;
        console.log("hasAlpha", hasAlpha, "components", components);
        if (components < 3) {
            console.log("This layer is not RGB image.");
            return;
        }
        const pixelData = new Uint8Array(await imageObj.imageData.getData());
        const b = imageObj.sourceBounds;
        const width = b.right - b.left;
        const height = b.bottom - b.top;
        console.log(`${width} x ${height} start`);
        const start_time = new Date().getTime();
        if (use_wasm) {
            invert_colors(pixelData, hasAlpha)
        } else {
            for (let i = 0; i < pixelData.length; i += components) {
                pixelData[i] = 255 - pixelData[i]; // R
                pixelData[i + 1] = 255 - pixelData[i + 1]; // G
                pixelData[i + 2] = 255 - pixelData[i + 2]; // B
            }
        }
        console.log(`${width} x ${height} end ${new Date().getTime() - start_time}ms`);
        const imageData = await imaging.createImageDataFromBuffer(pixelData, {
            width: width,
            height: height,
            components: components,
            colorSpace: "RGB",
        });
        await imaging.putPixels({
            layerID: layer.id,
            imageData: imageData,
            pixels: pixelData,
            bounds: imageObj.bounds,
        });
    });
}


async function invert_with_wasm() {
    console.log("invert_with_wasm");
    try{
        await invertLayer(true);
    } catch (err) {
        console.error(err);
        app.showAlert("Error invert_with_wasm " + err);
    }
}

async function invert_without_wasm() {
    console.log("invert_without_wasm");
    try{
        await invertLayer(false);
    } catch (err) {
        console.error(err);
        app.showAlert("Error invert_without_wasm " + err);
    }
}
