import * as fs from 'fs';
import animeMovie from '../api-json/anime_movie_batch.json';
import AnimeMovieObject from '../classes/animeMovieObject';

/**
 * Parses the genre(s) of an anime movie into an array
 * @param genres the genre(s) of the anime from the external API
 */
function parseAnimeMovieGenre(genres: { name: string; }[]) {
  const returnGenres = new Set<string>();
  genres.forEach((genre: { name: string; }) => {
    returnGenres.add(genre.name.toLowerCase());
  });
  return Array.from(returnGenres);
}

/**
 * Parses the anime movie api-json and creates anime movie objects. The goal is to
 * reduce the amount of data present by only including needed data. Some data requires
 * some separate mapping (see parseAnimeMovieGenre).
 */
export const getAnimeMovie = async () => {
  const anime: AnimeMovieObject[] = [];
  animeMovie.forEach((movie: any) => {
    let name = movie.title;
    if (movie.title_english != null) {
      name = movie.title_english;
    }
    const durations = movie.duration.trim().split(/\D+/);
    let minutes = 0;
    let hours = 0;
    if (durations.length === 1) {
      hours = 0;
      minutes = Number.parseInt(durations[0], 10);
    } else {
      hours = Number.parseInt(durations[0], 10);
      if (!(durations[1] === '')) {
        minutes = Number.parseInt(durations[1], 10);
      }
    }
    const runtime = hours * 60 + minutes;
    anime.push(
      new AnimeMovieObject(
        parseAnimeMovieGenre(movie.genres),
        name,
        movie.mal_id,
        movie.images.jpg.large_image_url,
        movie.score,
        movie.scored_by,
        runtime,
        movie.aired.prop.from.year,
      ),
    );
  });

  fs.writeFile('../static/anime_movies.json', JSON.stringify(anime), (err: any) => {
    if (err) console.log(err);
  });
};
