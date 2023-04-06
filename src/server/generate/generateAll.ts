import * as animeTV from './parseAnimeTV';
import * as animeMovies from './parseAnimeMovies';
import * as movies from './parseMovies';
import * as TV from './parseTV';
import * as genres from './parseGenres';

/**
 * Parses all the files generated from the external API batch call and maps the necessary
 * information to movie, tv show, anime movie, and anime tv show objects to be used
 * by the algorithm.
 */
const generateAllFiles = async () => {
  animeTV.getAnimeTv();
  animeMovies.getAnimeMovie();
  movies.getMovies();
  TV.getTVShows();
  genres.getGenres();
};

console.log('Generating all files...');
generateAllFiles();
console.log('Generating all files!');
