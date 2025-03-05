import base64
from pathlib import Path

target_folder = Path('./rust_pkg')
for wasm_file in target_folder.glob('*.wasm'):
    wasm = base64.b64encode(wasm_file.read_bytes()).decode('utf-8')
    js_file_name = f'./uxp_pkg/{wasm_file.stem[:-3] if wasm_file.stem.endswith("_bg") else wasm_file.stem}_wasm.js'
    js_file = Path(js_file_name)
    js_file.write_text(f'const wasmBase64 = "{wasm}";\nmodule.exports = {{wasmBase64}};\n')

