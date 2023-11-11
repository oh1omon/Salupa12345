import { z } from "zod";

// Player data type schema
export const player = z.object({
  id: z.number(),
  username: z.string(),
  isBot: z.boolean(),
});

export type Player = z.infer<typeof player>;

// Message data type schema
export const message = z.object({
  senderId: z.number(),
  content: z.string(),
  timestamp: z.number(),
  gameId: z.number()
});

export type Message = z.infer<typeof message>;

// Game data type schema
export const game = z.object({
  id: z.number(),
  playerId: z.number(),
  opponentId: z.number(),
  messages: z.array(message).nullable(),
  isGuessMade: z.boolean(),
  isCorrectGuess: z.boolean().nullable(),
});

export type Game = z.infer<typeof game>;

export const bot = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string(),
  isChatEnabled: z.boolean(),
});

export type Bot = z.infer<typeof bot>;

// Combined data type for the entire game state schema
export const gameSession = z.object({
  id: z.number(),
  playerId: z.number(),
  opponentId: z.number().nullable(),
  isVerusPlayer: z.boolean(),
  gameId: z.number().nullable(),
});

// Action data type schema
export const gameAction = z.union([
  z.object({
    type: z.literal('SEND_MESSAGE'),
    content: z.string(),
  }),
  z.object({
    type: z.literal('MAKE_GUESS'),
    isBot: z.boolean(),
  }),
]);

export enum SessionState {
  // no session
  WAITING_FOR_SESSION = "WAITING_FOR_SESSION",

  // session created, no opponent
  WAITING_FOR_OPPONENT = "WAITING_FOR_OPPONENT",

  // opponent found, game created
  GAME_IN_PROGRESS = "GAME_IN_PROGRESS",

  // guess is done
  GUESS_DONE = "GUESS_DONE"
}


export type GameAction = z.infer<typeof gameAction>;
