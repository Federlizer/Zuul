let inputFunction: (question?: string)=> Promise<string>;
let outputFunction: (...output: Array<string>) => void;

const setInput = (callback: (question?: string) => Promise<string>) => {
    inputFunction = callback;
}

const setOutput = (callback: (...output: Array<string>) => void) => {
    outputFunction = callback;
}

const read = (question?: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        resolve(inputFunction(question));
    })
}

const write = (output: string): void => {
    outputFunction(output);
}

const log = (message: string): void => {
    console.log(message);
}

export default {
    setInput,
    setOutput,
    read,
    write,
    log,
};
