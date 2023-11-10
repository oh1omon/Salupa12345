// Player data type
type Player = {
    id: string; // unique identifier for the player
    username: string; // player's username
    isBot: boolean; // indicates whether the player is a bot or a real person
  };
  
  // Message data type
  type Message = {
    id: string; // unique identifier for the message
    sender: Player; // player who sent the message
    content: string; // text content of the message
    timestamp: number; // timestamp when the message was sent
  };
  
  // Game data type
  type Game = {
    id: string;
    players: [Player, Player]; // array of two players participating in the game
    messages: Message[]; // array of messages exchanged during the game
    isGuessMade: boolean; // indicates whether a guess has been made by the player
    isCorrectGuess: boolean | null; // indicates whether the guess was correct (if made)
  };
  
  // AI Bot data type
  type Bot = {
    id: string; // unique identifier for the bot
    name: string; // name of the bot
    avatar: string; // URL or identifier for the bot's avatar image
    isChatEnabled: boolean; // indicates whether the bot can participate in chat games
    // Add any other properties specific to your AI bot
  };
  
  // Combined data type for the entire game state
  type GameState = {
    currentPlayer: Player; // player who is currently making a move
    currentGame: Game | null; // the ongoing game or null if no game is in progress
    availableBots: Bot[]; // array of available AI bots for the player to choose from
  };
  
  // Action data type (for game actions, e.g., sending a message, making a guess, etc.)
  type GameAction =
    | { type: 'SEND_MESSAGE'; content: string }
    | { type: 'MAKE_GUESS'; isBot: boolean };
  
  