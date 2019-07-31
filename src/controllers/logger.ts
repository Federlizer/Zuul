let outputFunction: (...output: Array<string>) => void;

const setOutput = (callback: (...output: Array<string>) => void) => {
    outputFunction = callback;
}

const write = (output: string): void => {
    if (!outputFunction)
        console.log(output);
    else 
        outputFunction(output);
}

const log = (message: string): void => {
    console.log(message);
}

export default {
    setOutput,
    write,
    log,
};
