import { wtns, groth16 } from 'snarkjs';
import { exec } from 'child_process';
import fs from 'fs';
import { join } from 'path';

async function generateProof(input) {
  const circuitWasmPath = join(__dirname, '..', 'circuits', 'circuit.wasm');
  const zkeyPath = join(__dirname, '..', 'circuits', 'circuit_final.zkey');

  const witness = await wtns.calculate(input, circuitWasmPath);
  const { proof, publicSignals } = await groth16.prove(zkeyPath, witness);

  return { proof, publicSignals };
}

export default { generateProof };
