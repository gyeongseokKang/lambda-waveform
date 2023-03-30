import fetch from "node-fetch";
import { AudioContext } from "web-audio-api";

const testWav = "https://file-examples.com/storage/feb401d325641db2fa1dfe7/2017/11/file_example_WAV_1MG.wav";
const testMp3 =
  "https://d2u3ecdp9u36hp.cloudfront.net/gsep/1/20230329/ebd32ceb-00c7-4c80-8726-1806f2eca30d/file_example_WAV_1MG_result_rest_of_targets.mp3";

export const handler = async (event) => {
  const audioBuffer = await getAudioBufferFromAudioUrl(testMp3);

  const filteredData = [];

  const rawData = audioBuffer.getChannelData(0);
  const samples = audioBuffer.duration * 100;
  const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision

  for (let i = 0; i < samples; i++) {
    const blockStart = blockSize * i; // the location of the first sample in the block
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j] || 0); // find the sum of all the samples in the block
    }
    filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      data: audioBuffer,
    }),
  };

  return response;
};

const getAudioBufferFromAudioUrl = async (url) => {
  return fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      return new Promise((resolve, reject) => {
        const audioContext = new AudioContext();
        audioContext.decodeAudioData(arrayBuffer, (value) => {
          resolve(value);
        });
      });
    });
};
