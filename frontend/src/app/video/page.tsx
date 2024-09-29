import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

export default function Home() {
  const [model, setModel] = useState<use.UniversalSentenceEncoder | null>(null);
  const [input, setInput] = useState<string>('');
  const [embedding, setEmbedding] = useState<number[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load the model
    use.load().then((loadedModel) => {
      setModel(loadedModel);
      setIsLoading(false);
    }).catch((error) => {
      console.error('Failed to load model:', error);
      setIsLoading(false);
    });
  }, []);

  const generateEmbedding = async () => {
    if (model && input) {
      try {
        const embeddings = await model.embed([input]);
        const embeddingArray = await embeddings.array();
        setEmbedding(embeddingArray[0]);
      } catch (error) {
        console.error('Failed to generate embedding:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sentence Embedding Generator</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a sentence"
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={generateEmbedding} disabled={isLoading || !model}>
        {isLoading ? 'Loading Model...' : 'Generate Embedding'}
      </button>
      {embedding && (
        <div>
          <h2>Embedding:</h2>
          <pre>{JSON.stringify(embedding, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}




tensorflowjs RAG nextjs