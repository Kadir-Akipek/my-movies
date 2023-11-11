import React from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import axios from 'axios';

//Listeleyeceğimiz film sayısı belli olmadığı için state kullanacağız, state içinde class component kullanacağız
//State bir obje olduğu için, state içerisindeki array property olacaktır
//Parent Component(App.js)' dan child component(MovieList)'a geçmemizin en kolay yolu MovieList'e prop oluşturmaktır
//fetch js'ye ait bir fonksiyondur, asenkron olarak network sorguları yapmamızı sağlar
//axious HTTP istekleri yapmak için kullanılıe
//İçeriğini görmek istediklerimizi render'a koyarız, api hariç
//Dışarıdan http isteği yapacaksak, componentDidMount metodu en uygunudur
//async asenkron demek

class  App extends React.Component {

    state = {
        movies : [],

        searchQuery: ""
    }  

    /*GET requiest'i fetch ile yaptık
        async componentDidMount() {
        const baseURL = "http://localhost:3002/movies";
        const response = await fetch(baseURL);
        console.log(response)
        const data = await response.json();
        console.log(data)
        this.setState({movies: data})
    }*/

    //GET request'i axious ile yaptık
    async componentDidMount() {
        const response = await axios.get("http://localhost:3002/movies")
        //console.log(response);
        this.setState({movies: response.data})
    }

    /*deleteMovie = (movie) => {
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );

        this.setState(state => ({
            movies: newMovieList
        }))
    }*/

    /*fetch api
    deleteMovie = async (movie) => {

        const baseURL = `http://localhost:3002/movies/${movie.id}`;
        await fetch(baseURL, {
            method: "DELETE"
        })

        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );

        this.setState(state => ({
            movies: newMovieList
        }))
    }*/

    //axious
    deleteMovie = async (movie) => {

        axios.delete(`http://localhost:3002/movies/${movie.id}`)
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );

        this.setState(state => ({
            movies: newMovieList
        }))
    }

    searchMovie = (event) => {
        //console.log(event.target.value)
        this.setState({searchQuery: event.target.value})
    }

    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        )

        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SearchBar 
                            searchMovieProp = {this.searchMovie}
                        />
                    </div>
                </div>
                <MovieList 
                movies={filteredMovies} 
                deleteMovieProp = {this.deleteMovie}    />
            </div>
        );
    }
};

export default App;