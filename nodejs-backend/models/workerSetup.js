import {Blob} from 'node:buffer';
import { Worker as Worker_ } from "node:worker_threads";

export default class WebWorker {
    constructor(worker) {
      const code = worker.toString();
      const blob = new Blob(["(" + code + ")()"]);
      console.log(URL.createObjectURL(blob))
      const data= new Worker_(URL.createObjectURL(blob));
      console.log(data)
      return data
    }
  }