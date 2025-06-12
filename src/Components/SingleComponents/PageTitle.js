import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = () => {
    return (
        <div
            className="breadcrumb-area bg-cover shadow dark text-center text-light"
            style={{ backgroundImage: 'url(assets/img/shape/5.jpg)' }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h1>Food Menu</h1>
                        <ul className="breadcrumb">
                            <li>
                                <Link to="/">
                                    <i className="fas fa-home"></i> Home
                                </Link>
                            </li>
                            <li>Menu</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
