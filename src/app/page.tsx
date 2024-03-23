'use client';

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { createRoot } from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import SelectionInput from '@/components/SelectionInput';
import { getGptChatResponse, getGptResponse } from '../lib/gpt';
import { prepareDefineStoryPrompt, prepareGenerateStoryPrompt, prepareSystemPrompt } from '../lib/prompts';
import { getStorySetting, getSideCharacters, getNarrationMechanism, getSideCharactersWOccurrence, getRoundSideCharacters } from '../lib/game';

const Home: React.FC = () => {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedSetting, setSelectedSetting] = useState('');
  const [selectedMechanism, setSelectedMechanism] = useState('');
  const [selectedChoice, setSelectedChoice] = useState('');
  const [playerInput, setPlayerInput] = useState('');

  const handleGenerateStory = async () => {
    console.log('Generating Story...');
    setLoading(true);
    setStory('');
    setChoices([]);

    // const theme = selectedTheme;
    const theme = 'Sci-Fi'; // Default theme
    // const setting = await getStorySetting(setSelectedSetting);
    const setting = ''; // Default story setting
    // const sideCharacters = await getSideCharacters();
    const sideCharacters: string[] = []; // Default side characters
    let storyRounds = 10; // Default story rounds
    // const mechanism = await getNarrationMechanism(setSelectedMechanism);
    const mechanism = 'choice_based'; // Default narration mechanism

    console.log(`Selected Theme: ${theme}`);
    console.log(`Selected Setting: ${setting}`);
    console.log(`Selected Mechanism: ${mechanism}`);

    const withChoices = mechanism === 'choice_based';

    let sideCharactersWithOccurrence: { character: string; occurrence: number }[] = [];
    if (sideCharacters.length > 0) {
      sideCharactersWithOccurrence = getSideCharactersWOccurrence(storyRounds, sideCharacters);
    }

    const storySettingGptResponse = await getGptResponse(
      prepareDefineStoryPrompt(theme, setting),
      false,
      null,
      process.env.GPT_MODEL!,
      1.2
    );

    console.log('Story Setting GPT Response:', storySettingGptResponse);

    const storySetting = JSON.parse(storySettingGptResponse);

    const messages = [
      { role: 'system', content: prepareSystemPrompt() },
      { role: 'user', content: prepareGenerateStoryPrompt(JSON.stringify(storySetting), withChoices) },
    ];

    let generatedStory = '';

    while (storyRounds > 0) {
      storyRounds--;

      generatedStory += 'Narrator: \n';
      const response = await getGptChatResponse(
        messages,
        true,
        (content) => {
          setStory((prevStory) => prevStory + content);
        },
        process.env.GPT_MODEL!,
        0.2
      );
      messages.push({ role: 'assistant', content: response });

      console.log('GPT Response:', response);

      if (storyRounds < 1) {
        break;
      }

      generatedStory += '\nPlayer: \n';

      if (withChoices) {
        const choicesText = response.split('\n').slice(-3);
        setChoices(choicesText.map((choice) => choice.slice(3)));

        const playerChoice = await new Promise<string>((resolve) => {
          const handleChoiceChange = (value: string) => {
            setSelectedChoice(value);
            resolve(value);
          };

          const selectionInput = document.createElement('div');
          selectionInput.setAttribute('id', 'selection-input-container');
          document.body.appendChild(selectionInput);

          const root = createRoot(selectionInput);
          root.render(
            <SelectionInput
              title="Choose your action"
              options={choicesText}
              value=""
              onChange={handleChoiceChange}
            />
          );
        });

        messages.push({ role: 'user', content: playerChoice });
      } else {
        const playerInput = await new Promise<string>((resolve) => {
          const handleInputChange = (value: string) => {
            setPlayerInput(value);
            resolve(value);
          };

          const selectionInput = document.createElement('div');
          selectionInput.setAttribute('id', 'selection-input-container');
          document.body.appendChild(selectionInput);

          const root = createRoot(selectionInput);
          root.render(
            <SelectionInput
              title="Enter your action"
              options={[]}
              allowCustomInput={true}
              value=""
              onChange={handleInputChange}
            />
          );
        });

        let finalPlayerInput = playerInput;
        const availableSideChars = getRoundSideCharacters(storyRounds, sideCharactersWithOccurrence);
        if (availableSideChars.length > 0) {
          for (const char of availableSideChars) {
            finalPlayerInput += `. ADD CHARACTER: '${char.character}'`;
          }
        }

        if (storyRounds === 3) {
          finalPlayerInput += '. DRAW';
        }

        if (storyRounds === 1) {
          finalPlayerInput += '. END';
        }

        messages.push({ role: 'user', content: finalPlayerInput });
      }
    }

    setStory((prevStory) => prevStory + '\n\nTHE END\n\n\nThank you for playing!');
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-2 text-gradient bg-gradient-to-r from-purple-500 to-blue-500">EtherTale</h1>
        <p className="text-lg mb-8 text-gray-300">Weave Stories Together. Forever.</p>
        <div className="mb-8">
          <SelectionInput
            title="Story Theme"
            options={['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Thriller']}
            value={selectedTheme}
            onChange={setSelectedTheme}
          />
        </div>
        <button
          onClick={handleGenerateStory}
          disabled={loading}
          className="px-6 py-2 mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating Story...' : 'Generate Story'}
        </button>
        <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="text-lg whitespace-pre-wrap mb-4">{story}</div>
              {choices.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Choices:</h3>
                  {choices.map((choice, index) => (
                    <div key={index} className="mb-2">
                      {choice}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Home;