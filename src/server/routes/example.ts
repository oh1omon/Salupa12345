import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const exampleRouter = router({
    getExample: publicProcedure
        .input(z.string().nullable())
        // should be async
        .query(({ input }) => {
            if (!input || input.length === 0) {
                return null
            }

            try {
                // const { data } = await axios.get<Destination[]>(
                //     `https://api.apilayer.com/geo/city/name/${input}`,
                //     {
                //         headers: {
                //             apiKey: apiKey,
                //         },
                //     }
                // )

                // return data

                return null;
            } catch (error) {
                console.error(
                    'Unexpected error while fetching destinations, ',
                    error
                )
                return null
            }
        }),
})
