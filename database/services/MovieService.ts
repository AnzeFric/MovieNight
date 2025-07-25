import { database } from "@/database/index";
import { MovieInfo } from "@/interfaces/movie";
import { Q } from "@nozbe/watermelondb";
import Movie from "../models/Movie";

export class MovieService {
  static async createMovie(movieData: MovieInfo): Promise<MovieInfo> {
    return await database.write(async () => {
      const movie = await database.get<Movie>("movies").create((movie) => {
        movie.uuid = movieData.uuid;
        movie.name = movieData.name;
        movie.length = movieData.length;
        movie.rating = movieData.rating;
        movie.year = movieData.year;
        movie.genres = movieData.genres;
        movie.director = movieData.director;
        movie.description = movieData.description;
        movie.picker = movieData.picker;
      });

      return movie;
    });
  }

  static async fetchMovies(): Promise<Array<MovieInfo>> {
    const movieRecords = await database.get<Movie>("movies").query().fetch();

    const movieData: Array<MovieInfo> = await Promise.all(
      movieRecords.map(async (movieRecord) => {
        const movie: MovieInfo = {
          uuid: movieRecord.uuid,
          name: movieRecord.name,
          length: movieRecord.length,
          rating: movieRecord.rating,
          year: movieRecord.year,
          genres: movieRecord.genres,
          director: movieRecord.director,
          description: movieRecord.description,
          picker: movieRecord.picker,
        };
        return movie;
      })
    );

    return movieData;
  }

  static async deleteMovie(movieUuid: string): Promise<void> {
    await database.write(async () => {
      const movies = await database
        .get<Movie>("movies")
        .query(Q.where("uuid", movieUuid))
        .fetch();

      await movies[0].destroyPermanently();
    });
  }
}
