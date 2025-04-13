/* eslint-disable @next/next/no-img-element */
import React, { Component } from 'react'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default class NextJsCarousel extends Component {
	render() {
		return (
			<div className='col-md-10' style={{marginLeft: "auto", marginRight: "auto"}}>
			
			<Carousel autoPlay interval={5000} infiniteLoop dynamicHeight >
				<div key={1}>
					<img className="img-fluid mx-0" src="/about_footer1.jpg" alt="about_footer1.jpg" />
					<p className="legend">Colorful Soap</p>
				</div>
				<div key={2}>
					<img className="img-fluid mx-0" src="/about_footer2.jpg" alt="about_footer2.jpg"  />
					<p className="legend">The Morning Ritual Product Line</p>

				</div>
				<div key={3}>
					<img className="img-fluid mx-0" src="/about_footer3.jpg" alt="about_footer3.jpg" />
					<p className="legend">On Display at Charleston Coffee Exchange</p>

				</div>
				{/* <div>
					<img src="/4.png" alt="image4"/>
					<p className="legend">Image 4</p>

				</div>
				<div>
					<img src="/5.png" alt="image5"/>
					<p className="legend">Image 5</p>

				</div> */}
			</Carousel>
			</div>
		);
	}
};
