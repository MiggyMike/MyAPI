import React, { Component } from 'react';
import { __GetRecipes } from '../services/RecipeServices';
import { Link } from 'react-router-dom';
import '../styles/global.css';

export default class Recipes extends Component {
    constructor() {
        super();
        this.state = {
            recipes: [],
            currentPage: 1,
        };
    }

    componentDidMount() {
        this.getRecipes();
    }

    getRecipes = async () => {
        try {
            const foundRecipes = await __GetRecipes(this.state.currentPage);
            this.setState({ recipes: foundRecipes });
        } catch (err) {
            console.log(err);
        }
    };

    incrementPage = () =>
        this.setState(
            (prevstate) => ({ currentPage: prevstate.currentPage + 1 }),
            () => this.getRecipes()
        );

    render() {
        const { recipes } = this.state;
        return (
            <div className=' container '>
                <h2>Popular Recipes</h2>
                <section className=''>
                    <div className='row'>
                        {recipes.length ? (
                            recipes.map((recipe) => (
                                <div
                                    className=' col s12 m6 l4'
                                    key={recipe._id}>
                                    <div className='card small hoverable'>
                                        <div className='card-image waves-effect waves-block waves-light'>
                                            <img
                                                className='responsive-img'
                                                src={recipe.image_url}
                                                alt=''
                                                onClick={() =>
                                                    this.props.history.push(
                                                        `/recipe/${recipe._id}`
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className='card-content'>
                                            <span className='card-title activator grey-text text-darken-4'>
                                                {recipe.title}
                                                <i className='material-icons right'>
                                                    more_vert
                                                </i>
                                            </span>
                                            <p>
                                                <Link
                                                    className=' blue-text text-lighten-1'
                                                    to='#'
                                                    onClick={() =>
                                                        this.props.history.push(
                                                            `/recipe/${recipe._id}`
                                                        )
                                                    }>
                                                    View More
                                                </Link>
                                            </p>
                                        </div>
                                        <div className='card-reveal'>
                                            <span className='card-title grey-text text-darken-4'>
                                                {recipe.title}
                                                <i className='material-icons right'>
                                                    close
                                                </i>
                                            </span>
                                            <p>
                                                Summary:{' '}
                                                {recipe.summary.substring(
                                                    0,
                                                    50
                                                )}
                                                ...
                                            </p>
                                            <p>
                                                Total Time:{' '}
                                                {recipe.totalTime.substring(
                                                    0,
                                                    50
                                                )}
                                                ...
                                            </p>
                                            <p>
                                                Servings:{' '}
                                                {recipe.servings.substring(
                                                    0,
                                                    50
                                                )}
                                            </p>
                                            <p>
                                                Category:{' '}
                                                {recipe.category.substring(
                                                    0,
                                                    50
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h3>No Recipes</h3>
                        )}
                    </div>
                    <button
                        className='btn #42a5f5 blue lighten-1 waves-light waves-effect'
                        onClick={() => this.incrementPage()}>
                        Load More
                    </button>
                </section>
            </div>
        );
    }
}
