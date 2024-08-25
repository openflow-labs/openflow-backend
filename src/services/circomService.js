const snarkjs = require('snarkjs');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

async function generateProof(input) {
  const circuitWasmPath = path.join(__dirname, '..', 'circuits', 'circuit.wasm');
  const zkeyPath = path.join(__dirname, '..', 'circuits', 'circuit_final.zkey');

  const witness = await snarkjs.wtns.calculate(input, circuitWasmPath);
  const { proof, publicSignals } = await snarkjs.groth16.prove(zkeyPath, witness);

  return { proof, publicSignals };
}

module.exports = { generateProof };
