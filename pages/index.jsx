import { useState } from "react";
const { Configuration, OpenAIApi } = require("openai");
import { createPrompt } from "../codex/completions";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function Header({ title }) {
  return <h1>{title ? title : "Default title"}</h1>;
}

function HomePage() {
  const [codexInput, setCodexInput] = useState("");
  const [codexOutput, setCodexOutput] = useState(null);
  const [exampleInputs, setExampleInputs] = useState(new Array(0));

  const addExample = () => {
    setExampleInputs([...exampleInputs, "", ""]);
  };

  async function handleRun() {
    // combine every two exampleInputs into one into an array of half the size
    const examples = exampleInputs.reduce((acc, cur, i) => {
      if (i % 2 === 0 && (exampleInputs[i]?.trim()?.length !== 0)) {
        acc.push(`${exampleInputs[i]} --> ${exampleInputs[i + 1]}`);
      }
      return acc;
    }, []);
    console.log("examples", examples);

    const prompt = createPrompt(codexInput, examples);
    console.log("prompt", prompt);

    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: prompt,
      temperature: 0,
      max_tokens: 40,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['"""'],
    });
    setCodexOutput(response.data.choices[0].text);

    console.log("response", response.data);
  }

  return (
      <div>
        <Header title="Formula generator 🚀" />
        {/* 
      Create large input textbox to set codexInput
       */}
    <span>

        <textarea
          rows="20"
          cols="50"
          // type="text"
          value={codexInput}
          onChange={(e) => setCodexInput(e.target.value)}
        />
        <div>
          Examples:
          {exampleInputs.map(
            (exampleInput, index) =>
              index % 2 === 0 && (
                <div>
                  <input
                    value={exampleInputs[2 * index]}
                    onChange={(e) => {
                      let items = [...exampleInputs];
                      items[2 * index] = e.target.value;
                      setExampleInputs(items);
                    }}
                  />
                  <a> ====&gt;&gt;&gt; </a>

                  <input
                    value={exampleInputs[2 * index + 1]}
                    onChange={(e) => {
                      let items = [...exampleInputs];
                      items[2 * index + 1] = e.target.value;
                      setExampleInputs(items);
                    }}
                  />
                </div>
              )
          )}
        </div>
        
        <button onClick={addExample}>Add Example</button>
<div/>
<div/>

        <button onClick={handleRun}>Run Codex</button>


    </span>
    

<div>
        <h2>Output</h2>
    <span>

        {codexOutput?.split(';')?.[0] ?? "No output yet"}
    </span>
    </div>

      </div>
  );
}
export default HomePage;
