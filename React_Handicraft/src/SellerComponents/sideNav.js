import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../SellerComponents/sidebar.css";

function SideNav() {

    const { currentSeller } = useSelector(state => state.seller);
    const signout = () => {
        currentSeller = null;
    }

    return <>
        <div class="s-layout">

            <div class="s-layout__sidebar">
                <a class="s-sidebar__trigger" href="#0">
                    <i class="fa fa-bars"></i>
                </a>

                <nav class="s-sidebar__nav">
                    <ul>
                        <li>
                            <Link class="s-sidebar__nav-link" to="/sellerHome">
                                <i class="fa fa-home"></i><em>Home</em>
                            </Link>
                        </li>
                        {currentSeller &&
                            <Link to="/productList" className="s-sidebar__nav-link">
                                <i className="fas fa-chart-area fa-fw me-3" /><em>ProductList</em>
                            </Link>}
                        {currentSeller &&
                            <Link to="/order" className="s-sidebar__nav-link"><i className="fas fa-chart-bar fa-fw me-3" /><em>Orders</em></Link>}
                        {currentSeller &&
                            <Link to="/addproduct" className="s-sidebar__nav-link"><i class="fas fa-edit me-3"></i><em>Add Product</em></Link>}
                        {currentSeller &&
                            <Link to="/sales" className="s-sidebar__nav-link"><i className="fas fa-money-bill fa-fw me-3" /><em>Sales</em></Link>}
                        {currentSeller &&
                            <Link
                                className="s-sidebar__nav-link"
                                to="/sellersignin"
                                onClick={signout}

                            ><i class="fa fa-user me-3" aria-hidden="true"></i>
                                <em> SignOut</em>
                            </Link>}
                        {!currentSeller &&
                            <Link
                                className="s-sidebar__nav-link"
                                to="/sellersignin"


                            ><i class="fa fa-user-circle me-3" aria-hidden="true"></i>
                                <em>SignIn</em>
                            </Link>}
                        {!currentSeller &&

                            <Link
                                className="s-sidebar__nav-link"
                                to="/sellersignup"
                                tabIndex={-1}

                            ><i class="fa fa-user me-3" aria-hidden="true" />
                                <em> SignUp</em>
                            </Link>}

                    </ul>
                </nav>
            </div>



        </div>
    </>
}
export default SideNav;



