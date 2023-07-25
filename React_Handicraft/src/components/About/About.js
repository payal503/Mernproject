import Navigation from "../navigation/Navigation";
import "../About/About.css";


function About() {



    return <>
        <Navigation />
        <div className="container-fluid  mt-4 mb-5" style={{ height: "490px", width: "100%" }}>
            <div className="col-12 d-flex" >
                <div className="col-5 mt-5 ml-5">
                    <img className="img-fluid" src="./assets/img/gg.jpg" alt="" style={{ height: "400px", width: "500px", borderRadius: "7%" }} />
                </div>
                <div className="col-5 offset-1 mt-5 text-center">
                    <h1>
                        About Us
                    </h1>
                    <p>
                        From tales of tradition, from dusty workshops and the smell of the earth, Indian Handicrafts was shaped by the Bug Slayers group, on his wheel and by the carpenter’s steady hand. By the prick of the needle and the chisel on stone. This is the world where our stories are told. In places and practices from time immemorial, in folklore and fables that have somehow been forgotten. Handcrafted to glorious imperfection.

                        Indian Handicrafts brings you premium lifestyle products inspired by folklore and traditional crafts. Our products are handcrafted by artisans who have honed their skills over generations of practice.
                    </p>
                </div>
            </div>

            {/* <div class="container">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="card card-flip h-100">
                            <div class="card-front text-white bg-dark">
                                <div class="card-body">
                                    <i class="fa fa-search fa-5x float-right"></i>
                                    <h3 class="card-title">Front</h3>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                </div>
                            </div>
                            <div class="card-back bg-white">
                                <div class="card-body">
                                    <h3 class="card-title">Back</h3>
                                    <p class="card-text">Suprise this one has more more more more content on the back!</p>
                                    <a href="#" class="btn btn-outline-secondary">Action</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card card-flip h-100">
                            <div class="card-front text-white bg-warning">
                                <div class="card-body">
                                    <i class="fa fa-search-plus fa-5x float-right"></i>
                                    <h3 class="card-title">Front</h3>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                </div>
                            </div>
                            <div class="card-back bg-dark text-white">
                                <div class="card-body">
                                    <h3 class="card-title">Back #2</h3>
                                    <p class="card-text">Suprise this one has content on the back!</p>
                                    <a href="#" class="btn btn-outline-secondary">Action</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card card-flip h-100">
                            <div class="card-front text-white bg-primary">
                                <div class="card-body">
                                    <i class="fa fa-arrow-circle-right fa-5x float-right"></i>
                                    <h3 class="card-title">Front</h3>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content. This one is a little because it has more text!</p>
                                </div>
                            </div>
                            <div class="card-back bg-white">
                                <div class="card-body text-primary">
                                    <h3 class="card-title">Wow! #3</h3>
                                    <p class="card-text">Suprise this one has content on the back!</p>
                                    <a href="#" class="btn btn-outline-primary">Action</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 my-3">
                        <div class="card card-flip h-100">
                            <div class="card-front text-white bg-dark">
                                <div class="card-body">
                                    <i class="fa fa-search fa-5x float-right"></i>
                                    <h3 class="card-title">Front</h3>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                </div>
                            </div>
                            <div class="card-back bg-white">
                                <div class="card-body">
                                    <h3 class="card-title">Back</h3>
                                    <p class="card-text">Suprise this one has more more more more content on the back!</p>
                                    <a href="#" class="btn btn-outline-secondary">Action</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 my-3">
                        <div class="card card-flip h-100">
                            <div class="card-front text-white bg-danger">
                                <div class="card-body">
                                    <i class="fa fa-search fa-5x float-right"></i>
                                    <h3 class="card-title">Front</h3>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                </div>
                            </div>
                            <div class="card-back bg-white">
                                <div class="card-body">
                                    <h3 class="card-title">Back</h3>
                                    <p class="card-text">Suprise this one has more more more more content on the back!</p>
                                    <a href="#" class="btn btn-outline-secondary">Action</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 my-3">
                        <div class="card card-flip h-100">
                            <div class="card-front text-white bg-success">
                                <div class="card-body">
                                    <i class="fa fa-search fa-5x float-right"></i>
                                    <h3 class="card-title">Front</h3>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                </div>
                            </div>
                            <div class="card-back bg-white">
                                <div class="card-body">
                                    <h3 class="card-title">Back</h3>
                                    <p class="card-text">Suprise this one has more more more more content on the back!</p>
                                    <a href="#" class="btn btn-outline-secondary">Action</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="container-fluid mt-5 mb-5" >
                <div className="col-12 text-center"> <h1>Our Crafts</h1><hr style={{ border: "3px solid green" }} /></div>
                <div className="col-12 d-flex mb-5" style={{ marginLeft: "5vw" }}>
                    <div class="flip-card mt-5 col-2">
                        <div class="flip-card-inner" >
                            <div class="flip-card-front">
                                <img src="./assets/img/stone.jpg" alt="Avatar" style={{ width: "350px", height: "400px" }} />
                            </div>
                            <div class="flip-card-back" style={{ width: "350px", height: "400px" }}>
                                <h2>Stone carving</h2>
                                <h2>Mysore, India</h2>
                                <p>A craft honed for generation, Stone carving existed in India since before 5thcentury BCE. The ancient monument caves of Ajanta and Ellora bears its testimony. From household item to exquisite status, stone has embellished our living with it varied colour & texture</p>

                            </div>
                        </div>
                    </div>


                    <div class="flip-card mt-5 col-2 offset-1">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img src="./assets/img/metal1.jpg" alt="Avatar" style={{ width: "350px", height: "400px" }} />
                            </div>
                            <div class="flip-card-back" style={{ width: "350px", height: "400px" }} >
                                <h2>Metal Embossing</h2>
                                <h2>Onipenta,India</h2>
                                <p>Known to India for over 5000 years. Currently practiced in southern Indian state, the motifs embossed can be traced back to the grandeur of the Kakatiya Kingdom. The shapes are formed by beating, embossing motifs, welding & polishing the metal based on principles of balance & harmony</p>

                            </div>
                        </div>
                    </div>

                    <div class="flip-card mt-5 col-2 offset-1">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img src="./assets/img/screw.jpg" alt="Avatar" style={{ width: "350px", height: "400px" }} />
                            </div>
                            <div class="flip-card-back" style={{ width: "350px", height: "400px" }} >
                                <h2>Screw Pine weaving</h2>
                                <h2>Thrissur, India</h2>
                                <p>The Screw Pine plant grows along the banks of the rivers of Kerala. The long, sturdy leaves are peeled dried & Organically died. It’s plaited to create mats. Screw Pine is a significant cottage industry in the region, often employing women & offering a source of income.</p>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 d-flex mt-5" style={{ marginLeft: "5vw" }}>
                    <div class="flip-card mt-5 col-2">
                        <div class="flip-card-inner mt-5" >
                            <div class="flip-card-front">
                                <img src="./assets/img/kutch.jpg" alt="Avatar" style={{ width: "350px", height: "400px" }} />
                            </div>
                            <div class="flip-card-back" style={{ width: "350px", height: "400px" }}>
                                <h2>Kutch pottery</h2>
                                <h2>Kutch, India</h2>
                                <p>In the small village of Gundiyali, Gujarat, centuries are intact in this pottery craft. Carefully chosen mud, are ground,sieved & soften, shaped on a potter’s wheel, are left to dry in sun & shade. The amber coloured surface is decorated with natural Black & White</p>

                            </div>
                        </div>
                    </div>


                    <div class="flip-card mt-5 col-2 offset-1">
                        <div class="flip-card-inner mt-5">
                            <div class="flip-card-front">
                                <img src="./assets/img/rose.jpg" alt="Avatar" style={{ width: "350px", height: "400px" }} />
                            </div>
                            <div class="flip-card-back" style={{ width: "350px", height: "400px" }} >
                                <h2>Rosewood Inlay</h2>
                                <h2>More,India</h2>
                                <p>The great Indian ruler, Tipu Sultan was patron of the exquisite Rosewood Inlay craft.  In Mysore, the wood is inset with acrylic to produce intricate inlay work. Traditional motifs depict the splendour of the Mysore landscape, rife with elephants & coconut trees.</p>

                            </div>
                        </div>
                    </div>

                    <div class="flip-card mt-5 col-2 offset-1">
                        <div class="flip-card-inner mt-5">
                            <div class="flip-card-front">
                                <img src="./assets/img/belgaum.jpg" alt="Avatar" style={{ width: "350px", height: "400px" }} />
                            </div>
                            <div class="flip-card-back" style={{ width: "350px", height: "400px" }} >
                                <h2>Begaum pottery</h2>
                                <h2>Khanapur, India</h2>
                                <p>A small town in Karnataka, India, called Khanapur, is home to white and red ware pottery.This simplistic yet serene craft was traditionally used to make household clay ware. The white coloured clay, when baked  in the kiln brings hue of red in casual patterns, adding an unintentional hint of colour.</p>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>



    </>
}
export default About;