const audioCtx = new AudioContext();

async function loadAudioFile(code: String) {

  let response = await fetch(`audio/${code}.mp3`);
  if (!response.ok) {
    throw `Response: ${response.status} ${response.statusText}`;
  }
  let buffer = await response.arrayBuffer();
  let audioBuffer = await audioCtx.decodeAudioData(buffer);
  let source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);

  return source;
}

async function loadAllAudioFiles(codes: String[]) {

  let audioNodes = await Promise.all(codes.map((code) => loadAudioFile(code)));
  return new Map(codes.map((code, i) => [code, audioNodes[i]]));
}

export {loadAllAudioFiles};