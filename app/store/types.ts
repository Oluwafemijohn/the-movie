 interface IGenres{
    id:number;
    name:string
 }

 interface IProductionCompanies{
    id:number;
    logo_path:string;
    name:string;
    origin_country:string;
 }

 interface IProductionCountries{
    iso_3166_1:string;
    name:string;
 }
 interface ISpokenLanguages{
    english_name:string;
    iso_639_1:string;
    name:string;
 }


 interface IMovePayload {
    adult:boolean;
    backdrop_path:string;
    belongs_to_collection:string | null;
    budget:number;
    genres: IGenres[];
    homepage: string;
    id:number;
    imdb_id:string;
    original_language:string;
    original_title:string;
    overview:string;
    popularity:string;
    poster_path:string;
    production_companies:IProductionCompanies[];
    production_countries:IProductionCountries[];
    release_date:string;
    revenue:number;
    runtime:number;
    spoken_languages:ISpokenLanguages[];
    status:string;
    tagline:string;
    title:string;
    video:boolean;
    vote_average:number;
    vote_count:number
 }







interface IMovieList{
    poster_path: string;
    adult:boolean;
    overview:string;
    release_date:string;
    genre_ids:number[];
    id:number;
    original_title:string;
    original_language:string;
    title:string;
    backdrop_path:null | string;
    popularity:number;
    vote_count:number;
    video:boolean;
    vote_average:number;
}


interface IMovieListResponseType {
    page:number;
    results: IMovieList[];
    total_results:number;
    total_pages:number
}

interface IMoveDetails{
   adult:boolean;
   backdrop_path:string;
   genre_ids: number[];
   id:number;
   original_language:string;
   original_title:string;
   overview:string;
   popularity:number;
   poster_path: string;
   release_date:string;
   title:string;
   video:boolean;
   vote_average:number;
   vote_count:number
}


interface IMovieDetailsListResponseType {
   page:number;
   results: IMoveDetails;
   total_results:number;
   total_pages:number;
}

interface IMovieKey{
   key:string;
}

interface VideoResponse{
   key:string;
   results: IMovieKey[]
}