function Search() {
    return <>
        <div className="align-self-center d-flex mt-3 offset-2 col-8 text-centre">
            {" "}
            <form
                action=""
                method="get"
                className="modal-content modal-body border-0 p-0"
            >
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        id="inputModalSearch"
                        name="q"
                        placeholder="Search ..."
                    />
                    <button
                        type="submit"
                        className="input-group-text bg-success text-light"
                    >
                        <i className="fa fa-fw fa-search text-white" />
                    </button>
                </div>
            </form>
        </div>

    </>
}
export default Search;