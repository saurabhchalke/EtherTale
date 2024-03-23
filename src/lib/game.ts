import { gameSetupPrint, errorPrint } from "./print";
import SelectionInput from "../components/SelectionInput";

export const getStoryRounds = (): number => {
  const lengthMap: { [key: string]: string } = {
    "1": "20",
    "2": "50",
    "3": "100",
  };

  const statement = `
Please choose your story length:

1- Short
2- Medium
3- Long
  `;

  gameSetupPrint(statement);

  while (true) {
    const lengthInput = prompt();

    if (!Object.keys(lengthMap).includes(lengthInput?.trim() || "")) {
      errorPrint("Your input must be one of 1, 2, or 3");
    } else {
      const length = lengthMap[lengthInput!];
      return parseInt(length);
    }
  }
};

export const getStoryTheme = (): string | null => {
  const statement = `
Please input your story theme (escape, survival, romance, etc...)
leave blank if you want the AI to select a random theme:
  `;

  gameSetupPrint(statement);

  const userInput = prompt();

  if (!userInput?.trim()) {
    return null;
  }
  return userInput;
};

export const getSideCharacters = async (): Promise<string[]> => {
  const characters: string[] = [];

  while (true) {
    const character = await new Promise<string>((resolve) => {
      const handleCharacterChange = (value: string) => {
        resolve(value);
      };

      SelectionInput({
        title: "Enter a side character (or leave blank to finish)",
        options: [],
        allowCustomInput: true,
        value: "",
        onChange: handleCharacterChange,
      });
    });

    if (character.trim() === "") {
      break;
    }

    characters.push(character);
  }

  return characters;
};

export const getStorySetting = async (
  setSelectedSetting: (value: string) => void
): Promise<string | null> => {
  return new Promise((resolve) => {
    const handleSettingChange = (value: string) => {
      setSelectedSetting(value);
      resolve(value || null);
    };

    SelectionInput({
      title: "Choose your story setting",
      options: [
        "Castle",
        "Village",
        "Abandoned House",
        "Space Station",
        "Island",
      ],
      allowCustomInput: true,
      value: "",
      onChange: handleSettingChange,
    });
  });
};

export const getNarrationMechanism = async (
  setSelectedMechanism: (value: string) => void
): Promise<string> => {
  return new Promise((resolve) => {
    const handleMechanismChange = (value: string) => {
      setSelectedMechanism(value);
      resolve(value.toLowerCase().replace(" ", "_"));
    };

    SelectionInput({
      title: "Choose your narration mechanism",
      options: ["Free Text", "Choice Based"],
      value: "",
      onChange: handleMechanismChange,
    });
  });
};

export const getSideCharactersWOccurrence = (
  storyRounds: number,
  sideCharacters: string[]
): { character: string; occurrence: number }[] => {
  const rounds = storyRounds - 1;

  const decreaseByPercentage = (value: number, percentage: number): number => {
    return Math.round(value - value * percentage);
  };

  const getDecreasePercentage = (length: number): number => {
    const percentage = 100 / (0.1 * length + 1);
    return Math.round(percentage * 0.01);
  };

  const numbers = Array.from({ length: rounds }, (_, i) => i + 1);
  const weights = Array(numbers.length).fill(5);
  const decreasePercentage = getDecreasePercentage(sideCharacters.length);

  weights[0] = 0;

  const result: { character: string; occurrence: number }[] = [];

  for (const character of sideCharacters) {
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    const randomNumberIndex = numbers.indexOf(randomNumber);
    weights[randomNumberIndex] = decreaseByPercentage(
      weights[randomNumberIndex],
      decreasePercentage
    );

    result.push({ character, occurrence: randomNumber });
  }

  return result;
};

export const getRoundSideCharacters = (
  storyRounds: number,
  sideCharacters: { character: string; occurrence: number }[]
): { character: string; occurrence: number }[] => {
  return sideCharacters.filter((char) => char.occurrence === storyRounds);
};
